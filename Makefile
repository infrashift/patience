# PATIENCE — Astro + Starlight site, driven by bun.
# Run `make` (or `make help`) to list targets.

BUN  ?= bun
HOST ?= 0.0.0.0
PORT ?= 4321

.DEFAULT_GOAL := help
.PHONY: help install dev build preview test test-install test-ui test-report test-update clean

help: ## List available targets
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make <target>\n\n"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

node_modules: package.json bun.lock
	$(BUN) install
	@touch node_modules

install: ## Install dependencies with bun
	$(BUN) install

dev: node_modules ## Live-reloading dev server at http://localhost:4321/patience/ (also on your LAN)
	$(BUN) run dev -- --host $(HOST) --port $(PORT)

build: node_modules ## Production build into dist/
	$(BUN) run build

preview: build ## Serve the production build at http://localhost:4321/patience/
	$(BUN) run preview -- --host $(HOST) --port $(PORT)

test-install: node_modules ## One-time: download Playwright's Chromium (CI adds --with-deps)
	$(BUN) x playwright install $(if $(CI),--with-deps) chromium

test: build ## Build, then run the Playwright suite headless on all screen sizes
	$(BUN) x playwright test $(ARGS)

test-ui: build ## Build, then open the interactive Playwright UI
	$(BUN) x playwright test --ui $(ARGS)

test-report: ## Open the HTML report from the last test run
	$(BUN) x playwright show-report

clean: ## Remove build output, caches, test results, and node_modules
	rm -rf dist .astro node_modules test-results playwright-report
