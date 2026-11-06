<div align="center">

# 🐱⚡ PATIENCE, CAT LASER WALL CLOCK (忍耐・猫時計)

**An Enterprise-Grade Feline Kinetic Portrait & Ocular Laser Chronometer**  
*Proudly over-engineered by the Frontier AI Alignment Division at [Infrashift.io](https://infrashift.io)*

[![Build Status](https://img.shields.io/badge/build-purring-brightgreen.svg?style=flat-square)](#)
[![Carbon Footprint](https://img.shields.io/badge/Amazon_Rainforest_Consumed-1.00%25-critical.svg?style=flat-square)](#the-infrashiftio-global-mandate)
[![Monty Python Physics](https://img.shields.io/badge/Jaw_Hinge-Terry_Gilliam_Certified-orange.svg?style=flat-square)](#key-features--horological-breakthroughs)
[![All of the Dependencies](https://img.shields.io/badge/All_of_the_Dependencies-node__modules_%E2%88%9E-blue.svg?style=flat-square)](#installation--deployment)
[![Deploy](https://github.com/infrashift/patience/actions/workflows/deploy.yml/badge.svg)](https://github.com/infrashift/patience/actions/workflows/deploy.yml)

### 🌐 [Launch the clock](https://infrashift.github.io/patience/clock/) · [Project site](https://infrashift.github.io/patience/) · [Infrashift.io](https://infrashift.io)
[![License: MIT](https://img.shields.io/badge/License-MIT_(Meow_In_Time)-yellow.svg?style=flat-square)](#license)

</div>

---

## 🌍 The Infrashift.io Global Mandate

Here at **Infrashift.io**, we believe technology should only solve humanity’s most existential problems. Before provisioning our latest cluster of liquid-cooled H100 GPUs, we commissioned an exhaustive, double-blind global study. We surveyed a diverse panel of **1,000 people from around the world** to determine the single most important contribution that frontier Large Language Model (LLM) technology could produce for the future of civilization.

We expected the usual suspects:
- ❌ **A definitive cure for all forms of cancer?** *(Polled at 2.1% — "Too complicated, doctors are busy.")*
- ❌ **A durable blueprint for lasting world peace?** *(Polled at 0.8% — "What would cable news talk about?")*
- ❌ **Proofs for all seven Millennium Prize unsolved mathematics problems, including $\text{P} = \text{NP}$ and the Riemann Hypothesis $\zeta(s) = 0$?** *(Polled at 0.3% — "Nerds only.")*
- ❌ **The ultimate answer to the ultimate question of life, the universe, and everything?** *(Polled at 0.0% — "We already know it's $42$, stop asking.")*

**No.** 96.8% of respondents looked deep into their souls and demanded something far more urgent.

So, we diverted the hydroelectric output of three mid-sized nations, boiled a small glacial fjord for cooling, and **burned down approximately $\frac{1}{100}\text{th}$ of the Amazon rainforest** to power a 1.8-trillion-parameter frontier model through 47 iterative prompt-engineering epochs to produce...

### **PATIENCE.**
*(Specifically: A wall clock made of a Tabby cat's face whose eyeballs roll around in their sockets to point at the hour and minute, whose jaw unhinges like a 1970s Monty Python paper cutout, and whose pupils shoot high-energy plasma lasers that violently scorch the numbers off the clock bezel.)*

You're welcome, humanity.

---

## ✨ Key Features & Horological Breakthroughs

| Subsystem | Technical Specification | Why It Matters |
| :--- | :--- | :--- |
| **Ocular Chronometry** | **Right Eye:** Tracks the Hour ($1\text{–}12$).<br>**Left Eye:** Tracks the Minute ($0\text{–}60$). | Eliminates outdated metal clock hands in favor of unsettling feline eye contact. |
| **1 Hz Palpebral Tick** | Precision eyelid kinematics synchronized to `Date.prototype.getSeconds()`. | The cat blinks once every second. If you stare at it long enough, you will blink in sync too. |
| **Thermonuclear `Clock Guide` Mode** | Dual multi-layered plasma beams ($T \approx 5{,}800\text{ K}$) with dynamic particle sparks, rising smoke, and smoldering bezel scorch trails. | Telling time shouldn't be passive. The cat's irises turn molten crimson and physically incinerate the current hour and minute on the dial. |
| **Terry Gilliam Cutout Jaw Engine** | Real-time `offCanvas` polygonal chin slicing along a custom Bezier feline upper-lip curve (`traceUpperLipCurve`) quantized to $12\text{ fps}$ stop-motion. | Instead of a cheap PNG overlay, the cat's actual chin is surgically sheared from the photograph and hinged downward to reveal paper-cutout fangs and a waggling pink tongue. |
| **Automated Quarter-Hour Tantrums** | **`:00` (On the Hour):** 30-second laser meltdown.<br>**`:15`, `:30`, `:45`:** 15-second laser meltdown. | Because a grandfather clock going *bong-bong* is for cowards. |
| **Web Audio Formant Synthesizer** | Zero audio files. Pure procedural dual-oscillator sawtooth/triangle synthesis passed through bandpass vocal-tract filters + white-noise hiss generator. | Produces a melodic *"Mee-oww"* at the top of normal minutes, and an unhinged, vibrating mad-cat yowl when the lasers fire. |
| **12H / 24H Tactical Readout** | Instant toggle between standard (`AM`/`PM`) and military (`00:00–23:59`) digital display, paired with full date telemetry. | For operators who need to know whether the cat is screaming at `03:00` or `15:00`. |

---

## 🚀 Installation & Deployment

Despite consuming roughly 4.2 × 10¹⁴ Joules of frontier LLM inference to conceive, **the clock itself** is still a **100% self-contained, zero-build single HTML file**: [`public/clock/index.html`](public/clock/index.html). No Webpack, no Vite, no `node_modules` black hole. Just open it in a browser.

The **project site** around it ([infrashift.github.io/patience](https://infrashift.github.io/patience/)) is built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) and [bun](https://bun.sh). The clock is served at [`/patience/clock/`](https://infrashift.github.io/patience/clock/).

### Just the clock
```bash
git clone https://github.com/infrashift/patience.git
cd patience
xdg-open public/clock/index.html   # Linux  (macOS: open, Windows: start)
```

### The site (live reload)
Requires [bun](https://bun.sh) and `make`.
```bash
make            # list targets
make dev        # http://localhost:4321/patience/ — also on your LAN for phones & tablets
make build      # production build → dist/
make preview    # serve the production build
```

### Tests
A [Playwright](https://playwright.dev) suite (`tests/`) checks every page at phone, tablet, laptop, and desktop sizes. It verifies the clock fits the viewport with no scrolling, that no page scrolls sideways, the links, the light/dark sync, and mouse plus touch/pinch calibration.
```bash
make test-install   # one-time: download Playwright's Chromium
make test           # build + run headless
make test-ui        # interactive UI
make test-report    # open the last HTML report
```

### Hosting on GitHub Pages
Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): **test → build → deploy**. Pull requests run the tests only. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Running as a Live macOS Desktop Wallpaper
Yes, **PATIENCE** can judge you directly from your desktop background:
1. Download the open-source macOS utility **[Plash](https://sindresorhus.com/plash)** (or **Wallpaper Web Page**).
2. Point Plash to `https://infrashift.github.io/patience/clock/` or your local `file:///.../public/clock/index.html`.
3. Enable **"Browsing Mode"** in Plash if you want to toggle `Clock Guide` lasers on demand.

---

## 🛠️ Interactive Calibration Suite

Every cat's cranial geometry is slightly different. Clicking **Calibrate Eyes and Mouth** in the lower control bar unlocks our interactive alignment HUD:
- **Drag** the **Left Eye (Min)**, **Right Eye (Hr)**, or **Mouth / Jaw Hinge** handles directly on the canvas.
- **Scroll Wheel** (or **pinch** on a touch screen) over any handle to scale its radius (rₓ, r_y) to match the subject's anatomy.
- Automatic skin/fur pixel sampling (`sampleSubjectSkin`) recalculates eyelid shading in real time.

---

## 🤝 How to Contribute

We welcome contributions from chronologists, veterinarians, Monty Python historians, and remorseful AI researchers.

1. **Fork the Repository** (and star it so our investors think this was a B2B SaaS pivot).
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feat/more-intense-ocular-plasma
   ```
3. **Strict Contribution Guidelines:**
   - **Preserve the Single-File Mandate:** The clock must remain inside `public/clock/index.html`. The website around it was granted a `package.json` by special feline dispensation. The clock was not. Every bundler imported into the clock removes a kitten's whiskers.
   - **Run `make test`** before opening a PR. The cat must fit on every screen, including the one in your pocket.
   - **Acoustic Fidelity:** Any modifications to `playCatVocalization()` must be tested within earshot of a real domestic housecat. If your real cat does not immediately look up in alarm, your formant filter $Q$-values are too weak.
   - **Ecological Parity:** Please keep all PR descriptions concise so we don't burn down another $\frac{1}{100}\text{th}$ of the Amazon running CI/CD code review bots.
4. **Submit a Pull Request.**

---

## 💖 Sponsor This Project

Training frontier AI models to align cutout paper cat teeth along a cubic Bezier curve is not cheap. By sponsoring **Infrashift.io's Open Feline Initiative**, your funds go directly toward:

| Sponsorship Tier | Monthly Contribution | Perks & Carbon Offset |
| :--- | :---: | :--- |
| 🌱 **The Sapling Guilt Tier** | `$5 / mo` | We plant **one (1) fern** in the Amazon basin to begin paying back our LLM inference tab. |
| 🥫 **The Fancy Feast Tier** | `$25 / mo` | Fuels our QA testing department (three very judgmental studio cats) with premium pâté. |
| ⚡ **The Megawatt Laser Tier** | `$100 / mo` | Your name is etched in molten plasma into the repository credits, and our cat clock will scream in your honor at `:00`, `:15`, `:30`, and `:45`. |
| 🏢 **Enterprise Series-A Bailout** | `$10,000 / mo` | Our engineering team will fly to your office, mount an iPad running **PATIENCE** on your boardroom wall, and explain to your board of directors why this is "Agentic AI." |

👉 **[Become a GitHub Sponsor](https://github.com/sponsors)** or visit **[Infrashift.io](https://infrashift.io)** to inquire about enterprise licensing.

---

## 📜 License

Distributed under the **MIT License (Meow In Time)** — see below for full legal terms:

```text
MIT License

Copyright (c) 2026 Infrashift.io & The Global Panel of 1,000 People

Permission is hereby granted, free of charge, to any person or feline obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
2. Should the Software achieve sentience at the top of the hour (:00) and scorch
   your monitor bezel with ocular plasma, Infrashift.io assumes zero liability.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```
