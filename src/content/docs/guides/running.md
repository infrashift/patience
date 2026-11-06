---
title: Running PATIENCE
description: Open the clock in a browser, host it, or run it as a live macOS desktop wallpaper.
---

The clock itself is a **100% self-contained single HTML file**: [`public/clock/index.html`](https://github.com/infrashift/patience/blob/main/public/clock/index.html). No build step is needed to run it.

## In your browser

The hosted clock lives at **[infrashift.github.io/patience/clock/](https://infrashift.github.io/patience/clock/)**. Use the ⛶ button for fullscreen.

To run it from a clone:

```bash
git clone https://github.com/infrashift/patience.git
cd patience
xdg-open public/clock/index.html   # Linux
open public/clock/index.html       # macOS
start public/clock/index.html      # Windows
```

## On a phone or tablet

Open the hosted URL and use your browser's **Add to Home Screen**. The layout adapts to portrait and landscape. In landscape on a phone, the clock takes the full height and the controls move to the side.

## As a live macOS desktop wallpaper

Yes, **PATIENCE** can judge you directly from your desktop background:

1. Install **[Plash](https://sindresorhus.com/plash)**.
2. Point Plash at `https://infrashift.github.io/patience/clock/` (or your local `file:///…/public/clock/index.html`).
3. Enable **Browsing Mode** in Plash if you want to toggle the `Clock Guide` lasers on demand.
