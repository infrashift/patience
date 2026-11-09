import { test, expect, type Page } from '@playwright/test';
import { viewportMetrics, overflowingElements } from './helpers';

type Feature = 'leftEye' | 'rightEye' | 'mouth';

/** Waits until the canvas has been sized and the portrait has rendered at least one frame. */
async function openClock(page: Page) {
  await page.goto('clock/');
  await page.waitForFunction(() => {
    const c = document.getElementById('faceCanvas') as HTMLCanvasElement | null;
    // `state` is a top-level const in the clock's classic <script>, so it's reachable by name.
    return !!c && c.width > 0 && !!(globalThis as any).eval('state.lastFrameMap');
  });
}

/** Screen (CSS px) position of a calibratable feature, plus its current radius. */
async function featureOnScreen(page: Page, feature: Feature) {
  return page.evaluate((f) => {
    const ev = (globalThis as any).eval;
    const subj = ev('SUBJECTS[state.subjectIndex]')[f];
    const map = ev('state.lastFrameMap');
    const r = document.getElementById('faceCanvas')!.getBoundingClientRect();
    return {
      x: r.left + (map.mapX(subj.x) / 800) * r.width,
      y: r.top + (map.mapY(subj.y) / 800) * r.height,
      ux: subj.x as number,
      uy: subj.y as number,
      rx: subj.rx as number,
    };
  }, feature);
}

test.describe('clock page', () => {
  test('fits the viewport exactly: no scrolling, nothing cut off, round clock', async ({ page }) => {
    await openClock(page);
    const m = await viewportMetrics(page);

    expect(m.innerWidth, 'browser zoomed out because content is wider than the screen').toBe(m.clientWidth);
    expect(m.scrollWidth, `horizontal overflow: ${await overflowingElements(page)}`).toBeLessThanOrEqual(m.clientWidth);
    expect(m.scrollHeight, 'page scrolls vertically').toBeLessThanOrEqual(m.clientHeight);

    const box = (await page.locator('#faceCanvas').boundingBox())!;
    expect(Math.abs(box.width - box.height), 'clock is not a circle').toBeLessThanOrEqual(1);
    expect(box.width, 'clock is uselessly small').toBeGreaterThan(Math.min(m.clientWidth, m.clientHeight) * 0.55);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(m.clientWidth + 0.5);
    expect(box.y + box.height).toBeLessThanOrEqual(m.clientHeight + 0.5);

    // The essential controls are on screen without scrolling.
    for (const id of ['#digitalClock', '#modeOverlay', '#calibrateBtn', '#themeToggleBtn', '#githubLink']) {
      await expect(page.locator(id), `${id} not in viewport`).toBeInViewport({ ratio: 1 });
    }
  });

  test('canvas backing store tracks its on-screen size (crisp, not stretched)', async ({ page }) => {
    await openClock(page);
    const { css, px, dpr } = await page.evaluate(() => {
      const c = document.getElementById('faceCanvas') as HTMLCanvasElement;
      return { css: c.getBoundingClientRect().width, px: c.width, dpr: Math.min(devicePixelRatio, 2) };
    });
    expect(Math.abs(px - css * dpr)).toBeLessThanOrEqual(2);
  });

  test('header links to GitHub and back to the site', async ({ page }) => {
    await openClock(page);
    await expect(page.locator('#githubLink')).toHaveAttribute('href', 'https://github.com/infrashift/patience');
    await page.locator('#aboutLink').click();
    await expect(page).toHaveURL(/\/patience\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'PATIENCE' })).toBeVisible();
  });

  test('theme is shared with the site via starlight-theme', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('starlight-theme', 'dark'));
    await openClock(page);
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);

    await page.locator('#themeToggleBtn').click();
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
    expect(await page.evaluate(() => localStorage.getItem('starlight-theme'))).toBe('light');
  });

  test('calibration: mouse drag moves an eye, scroll wheel resizes it', async ({ page }, info) => {
    test.skip(!!info.project.use.hasTouch, 'mouse-only test');
    await openClock(page);
    await page.locator('#calibrateBtn').click();
    await expect(page.locator('#hoverGuide')).toContainText('Scroll wheel');

    const eye = await featureOnScreen(page, 'leftEye');
    await page.mouse.move(eye.x, eye.y);
    await page.mouse.wheel(0, -100);
    await expect.poll(async () => (await featureOnScreen(page, 'leftEye')).rx).toBeGreaterThan(eye.rx);

    await page.mouse.down();
    await page.mouse.move(eye.x + 20, eye.y + 10, { steps: 5 });
    await page.mouse.up();
    const moved = await featureOnScreen(page, 'leftEye');
    expect(moved.ux).toBeGreaterThan(eye.ux + 5);
  });

  test('calibration: touch drag moves an eye, pinch resizes it', async ({ page }, info) => {
    test.skip(!info.project.use.hasTouch, 'touch-only test');
    await openClock(page);
    await page.locator('#calibrateBtn').tap();
    await expect(page.locator('#hoverGuide')).toContainText('Pinch');

    const cdp = await page.context().newCDPSession(page);
    const touch = (type: string, points: { x: number; y: number }[]) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map((p, id) => ({ ...p, id })) } as any);

    // One-finger drag.
    const eye = await featureOnScreen(page, 'rightEye');
    await touch('touchStart', [{ x: eye.x, y: eye.y }]);
    await touch('touchMove', [{ x: eye.x - 15, y: eye.y + 8 }]);
    await touch('touchEnd', []);
    const moved = await featureOnScreen(page, 'rightEye');
    expect(moved.ux).toBeLessThan(eye.ux - 5);

    // Two-finger pinch-out centred on the eye.
    const c = await featureOnScreen(page, 'rightEye');
    await touch('touchStart', [{ x: c.x - 10, y: c.y }]);
    await touch('touchStart', [{ x: c.x - 10, y: c.y }, { x: c.x + 10, y: c.y }]);
    await touch('touchMove', [{ x: c.x - 25, y: c.y }, { x: c.x + 25, y: c.y }]);
    await touch('touchEnd', []);
    const pinched = await featureOnScreen(page, 'rightEye');
    expect(pinched.rx).toBeGreaterThan(c.rx * 1.5);
  });

  test('muting the sound cuts off a meow that is already playing', async ({ page }) => {
    await openClock(page);
    const toggle = page.locator('#soundToggleBtn');
    const live = () => page.evaluate(() => (globalThis as any).eval('activeVocalizations.size') as number);

    await toggle.click(); // sound on → muted
    await expect(page.locator('#soundLabel')).toHaveText('muted');
    await toggle.click(); // muted → sound on, plays a meow right away
    await expect(page.locator('#soundLabel')).toHaveText('sound on');
    expect(await live(), 'turning sound on should start a meow').toBeGreaterThan(0);

    await toggle.click(); // mute mid-meow
    await expect(page.locator('#soundLabel')).toHaveText('muted');
    expect(await live(), 'meow still playing after mute').toBe(0);
    expect(await page.evaluate(() => (globalThis as any).eval('state.minuteRoarBurst'))).toBe(0);
  });
});
