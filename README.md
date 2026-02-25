# Open WebAR SDK
Lightweight WebAR engine for Image Tracking, Face Tracking, QR Tracking, WebXR and AR 360.
Works on iOS Safari. Alternative to MindAR.

This repository is a monorepo with:
- Starter templates in [`templates/`](./templates)
- App initializer CLI in [`packages/create-webar-app/`](./packages/create-webar-app)
- Optional npm alias package [`webar-sdk`](./packages/webar-sdk)
- Existing runnable showcase demos in `threejs/*`

## Why This Repo Matters

If you are building WebAR, common pain points are predictable:
- Setup is fragmented across different examples and docs
- Boilerplate repeats across projects
- You need a fast proof-of-concept, not weeks of setup
- Browser delivery matters more than forcing native app installs
- Teams need demo-ready results quickly for stakeholders

This repo solves that with ready-to-run examples and templates for the main WebAR tracking modes supported by WebAR.Studio.

## Who Is This For?

- Web developers building immersive sites
- Marketing and creative agencies launching campaign AR
- E-commerce teams prototyping product preview and try-on flows
- Educators and students learning AR with real projects
- Startups validating AR product ideas quickly

## Quick Start

```bash
npx create-webar-app my-ar
```

Mode examples:

```bash
npx create-webar-app my-ar --image
npx create-webar-app my-ar --face
npx create-webar-app my-ar --qr
npx create-webar-app my-ar --webxr
npx create-webar-app my-ar --ar360
```

For scripting/CI use `--mode image|face|qr|webxr|ar-360`:

```bash
npx create-webar-app my-ar --mode image
npx create-webar-app my-ar --mode face
npx create-webar-app my-ar --mode qr
npx create-webar-app my-ar --mode webxr
npx create-webar-app my-ar --mode ar-360
```

`--template <name>` and `--type <name>` also map to mode.

| Mode | Template folder | Description |
| --- | --- | --- |
| image | image-tracking | Track printed images |
| face | face-tracking | Face filters |
| qr | qr-tracking | QR detection |
| webxr | webxr | WebXR AR |
| ar360 | ar-360 | 360 experiences |

## What's Inside

The repo includes modular examples and templates for:
- AR 360 environment tracking
- Face mesh tracking for filters and accessories
- Marker-based image tracking
- QR-anchored AR
- WebXR plane/surface tracking
- Multi-tracking scenarios (up to 100 images and QR codes)

Each mode has runnable demo code and a template-ready starter path.

## Tracking Types Breakdown

### ar-360
Type: 360 environment tracking (device orientation)
Use case: immersive panoramic scenes without marker or plane detection
Ideal for: virtual tours, storytelling, skybox product showcases

### face
Type: face mesh tracking
Use case: overlay content using facial landmarks
Ideal for: face filters, virtual try-on, selfie effects

### image
Type: marker-based image recognition
Use case: attach AR content to printed visuals
Ideal for: brochures, posters, business cards, packaging

### qr
Type: QR code anchored tracking
Use case: use a QR code as an AR anchor
Ideal for: print-to-AR campaigns, events, education triggers

### webxr
Type: real-world surface tracking via WebXR
Use case: detect planes and place digital objects in physical space
Ideal for: placement previews, AR furniture, spatial experiences

Note: WebXR mode requires compatible browsers and HTTPS.

## Tracking Modes Comparison

| Tracking Mode | Markerless | Image/QR Required | Best For | Browser Support |
| --- | --- | --- | --- | --- |
| `ar-360` | Yes | No | 360 tours, immersive scenes | Modern mobile browsers |
| `face` | Yes | No | Face filters, try-ons | Front camera browsers |
| `image` | No | Yes | AR on printed materials | WebGL/WebRTC capable browsers |
| `qr` | No | Yes | QR-triggered AR flows | Camera-capable browsers |
| `webxr` | Yes | No | Surface tracking, placement previews | WebXR-capable browsers |

## Packages

- Main SDK on npm: https://www.npmjs.com/package/@web-ar-studio/webar-engine-sdk
- Friendly npm entry: https://www.npmjs.com/package/webar-sdk
- Templates folder: [`templates/`](./templates)
- CLI package: [`packages/create-webar-app/`](./packages/create-webar-app)

## MindAR Note

MindAR and Open WebAR SDK both target browser-based AR use cases. This repo emphasizes one-command scaffolding and mode-based templates while keeping plain runnable demos in-repo.

## Local Development

Node.js >= 18 is required.

```bash
npm install
npm run smoke:create-webar-app
```

## Support and API key requests

- Telegram: https://t.me/was_team
- Email: support@web-ar.studio
- Discord: https://discord.gg/4q5dbAb4GZ

## Need custom WebAR solution?
👉 https://web-ar.studio
