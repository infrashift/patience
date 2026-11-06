import { test, expect } from '@playwright/test';
import { viewportMetrics, overflowingElements, openMobileMenuIfCollapsed } from './helpers';

const REPO = 'https://github.com/infrashift/patience';
const PAGES = ['', 'features/', 'guides/running/', 'guides/calibration/', 'guides/development/', 'contributing/', 'sponsor/', 'license/'];

test.describe('site', () => {
  for (const path of PAGES) {
    test(`/${path} renders without horizontal scrolling`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('main h1, .hero h1').first()).toBeVisible();

      const m = await viewportMetrics(page);
      expect(m.innerWidth, 'browser zoomed out because content is wider than the screen').toBe(m.clientWidth);
      expect(m.scrollWidth, `horizontal overflow: ${await overflowingElements(page)}`).toBeLessThanOrEqual(m.clientWidth);
    });
  }

  test('home page hero links to the clock, GitHub, and Infrashift.io', async ({ page }) => {
    await page.goto('');
    const hero = page.locator('.hero');
    await expect(hero.getByRole('link', { name: 'Launch the Clock' })).toHaveAttribute('href', '/patience/clock/');
    await expect(hero.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute('href', REPO);
    await expect(hero.getByRole('link', { name: 'Infrashift.io' })).toHaveAttribute('href', 'https://infrashift.io');

    await hero.getByRole('link', { name: 'Launch the Clock' }).click();
    await expect(page).toHaveURL(/\/patience\/clock\/$/);
    await expect(page.locator('#faceCanvas')).toBeVisible();
  });

  test('header has GitHub and Infrashift.io icons (in the menu on small screens)', async ({ page }) => {
    await page.goto('features/');
    await openMobileMenuIfCollapsed(page);

    await expect(page.locator(`a[href="${REPO}"]:visible`).first()).toBeVisible();
    await expect(page.locator('a[href="https://infrashift.io"]:visible').first()).toBeVisible();
    // Every docs page links to its source on GitHub.
    await expect(page.locator(`a[href^="${REPO}/edit/main/"]`)).toHaveCount(1);
  });

  test('light/dark toggle works and carries over to the clock', async ({ page }) => {
    await page.goto('features/');
    await openMobileMenuIfCollapsed(page);

    await page.locator('starlight-theme-select select:visible').first().selectOption('dark');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('starlight-theme-select select:visible').first().selectOption('light');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.locator('starlight-theme-select select:visible').first().selectOption('dark');

    await page.goto('clock/');
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  });

  test('every internal link resolves', async ({ page, request }, info) => {
    test.skip(info.project.name !== 'desktop', 'link check only needs to run once');
    const seen = new Set<string>();
    for (const path of PAGES) {
      await page.goto(path);
      const hrefs = await page.locator('a[href^="/patience/"]').evaluateAll((as) =>
        as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!.split('#')[0]),
      );
      hrefs.forEach((h) => seen.add(h));
    }
    expect(seen.size).toBeGreaterThan(5);
    for (const href of seen) {
      const res = await request.get(new URL(href, info.project.use.baseURL).toString());
      expect(res.status(), href).toBe(200);
    }
  });
});
