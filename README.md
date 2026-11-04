# CutIQ landing page

Static landing page for **CutIQ**, a bundle of 399 video editing skills for Claude (₹399). No build step and no framework, just HTML, CSS and JS.

## Files
- `index.html` holds the page. Sections in order: hero, showreel (1 clip, 8 skills), type-a-skill demo, before/after, effects, numbers, capabilities, skills explorer, earnings calculator, pricing, FAQ.
- `config.js` holds everything you would normally change: price, payment link, WhatsApp number, Meta Pixel ID, support email and refund policy.
- `assets/css/style.css` is the main theme. `assets/css/showreel.css` styles the showreel phone.
- `assets/js/app.js` builds the presenter, the reel stages, the effects, the before/after slider, the calculator and the skills explorer.
- `assets/js/showreel.js` runs the showreel. Each skill command is typed, rendered and then played inside the phone.
- `assets/js/skills-data.js` lists the 399 skill names, generated from the bundle catalogue.
- `privacy.html` and `terms.html` are template legal pages. Review them before going live.

## Run locally
```bash
python -m http.server 5600
```
Then open http://localhost:5600.

## Preview helpers
- `?srtest=xray` holds one showreel scene so you can inspect it. Other scenes: blueprint, aipanel, mockup, widgets, editor, pullback, recap.
- `?rec` shows the showreel full screen for recording a reel. The capture script calls `window.__go()` and `window.__tick()` so it runs frame-exact.

Not affiliated with Anthropic.
