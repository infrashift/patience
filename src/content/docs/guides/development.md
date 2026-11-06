---
title: Local development
description: Build and preview the PATIENCE site locally with bun, and run the Playwright test suite.
---

This site is built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) theme, using [bun](https://bun.sh) as the package manager and runtime. The clock is a static file in `public/clock/` and is copied into the site as-is.

## Make targets

```bash
make            # list targets
make install    # bun install
make dev        # live-reloading dev server → http://localhost:4321/patience/
make build      # production build → dist/
make preview    # serve the production build
make test       # build, then run the Playwright suite
make clean      # remove dist/, .astro/, node_modules/, test output
```

`make dev` listens on all interfaces (`--host`), so you can open the printed network URL on a real phone or tablet on the same Wi-Fi.

## Tests

The Playwright suite in `tests/` builds the site, serves it with `astro preview`, and checks every page at phone, tablet, laptop, and desktop sizes:

- **The clock fills the viewport exactly:** no scrolling, nothing cut off, and the clock is a perfect circle.
- **No page scrolls sideways** at any size.
- **Links:** the GitHub and Infrashift.io links are present, the clock and site link to each other, and every internal link resolves.
- **Theme:** the light/dark choice carries over between the site and the clock.

```bash
make test-install   # one-time: download Playwright's Chromium
make test           # headless run
make test-ui        # interactive Playwright UI
make test-report    # open the last HTML report
```

## Project layout

```
public/clock/index.html     the clock (single self-contained file)
src/content/docs/           site pages (Markdown / MDX)
astro.config.mjs            Starlight config: sidebar, social links, base path
tests/                      Playwright tests
.github/workflows/deploy.yml  test → build → deploy to GitHub Pages
```
