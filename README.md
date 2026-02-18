# Messenger Resizer

A browser userscript that adds a draggable resize handle to the left conversations panel on [facebook.com/messages](https://www.facebook.com/messages/), making it feel more like the standalone Messenger.com layout.

## Features

- **Drag-to-resize** — horizontally resize the conversations sidebar by dragging a handle on its right edge
- **Width persistence** — the chosen width is saved in `localStorage` and restored on page load
- **Min-width clamping** — CSS `min-width` prevents the panel from collapsing too far, and the drag logic handles the overshoot gracefully (no reverse-jitter)
- **No text selection during drag** — a `body.dragging` class disables `user-select` and forces an `ew-resize` cursor site-wide while dragging

## Tech Stack

- [Svelte 5](https://svelte.dev/) — UI component for the resize handle
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build tooling
- [drag-to-blank](https://www.npmjs.com/package/drag-to-blank) — lightweight drag interaction base class

## Project Structure

```
src/
  main.ts            # Entry point — MutationObserver bootstrap + Svelte mount
  App.svelte         # Resize handle component and scoped styles
  drag_handler.ts    # DragToResize class (extends DragToBlank) — resize logic & localStorage
  app.css            # Global styles (currently empty)
style.css            # Dev-only styles for local testing
index.html           # Dev-only HTML shell for local testing
```

## Development

```bash
# Install dependencies
npm install

# Start the dev server (uses index.html + style.css as a test harness)
npm run dev

# Type-check
npm run check

# Production build
npm run build
```

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) and [Stylus](https://add0n.com/stylus.html) browser extensions.
2. Download the latest built scripts and style sheets from the [Releases page](https://github.com/SamuelCharpentier/Messenger-resizer/releases).
3. In Tampermonkey, create a new userscript matching `https://www.facebook.com/messages/*` and paste the downloaded JS into it.
4. In Stylus, create a new userstyle for URLs starting with `https://www.facebook.com/messages/` and paste the downloaded CSS into it.

## Deployment

If you are developing locally and want to build from source:

1. **Build** the project:
    ```bash
    npm run build
    ```
2. **Tampermonkey** — create a new userscript matching `https://www.facebook.com/messages/*` and paste the built JS from `dist/` directly into it.
3. **Stylus** _(optional)_ — create a userstyle for `facebook.com/messages` if you need additional global CSS overrides beyond what the component provides.

> **Note:** `index.html` and `style.css` at the root are only used for local development and are not part of the deployed output.

## How It Works

1. `main.ts` uses a `MutationObserver` on the document to wait for the conversations panel (`[aria-label="Liste des publications"]`) to appear in the DOM (Facebook is a SPA, so the element may not exist on initial load). Once found, a second observer watches the element for re-renders and re-mounts the Svelte component as needed.
2. `App.svelte` renders an absolutely-positioned resize handle on the panel's right edge and instantiates `DragToResize`.
3. `DragToResize` (extending `DragToBlank`) captures the element's width and mouse position on drag start, then computes target width as an absolute value on each move — so CSS min/max clamping doesn't cause offset drift.
4. On drag end, the final clamped width is saved to `localStorage` under a key derived from the element's selector, and restored on the next page load.
