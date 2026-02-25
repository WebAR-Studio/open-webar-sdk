# create-webar-app

Create powerful browser-based AR experiences in minutes using real, working examples.

## Why This Repo Matters

If you are exploring WebAR, typical pain points are:
- WebAR setup feels complex and fragmented
- Boilerplate repeats from project to project
- You need quick proof-of-concept demos, not long setup cycles
- Browser delivery is preferred over native app installs
- You need to show results fast to clients and stakeholders

This CLI solves that by generating ready-to-run projects for major tracking modes supported by WebAR.Studio.

## Who Is This For?

- Web developers building immersive sites
- Marketing and creative teams launching AR campaigns
- E-commerce teams prototyping try-on and product preview experiences
- Educators and students learning AR with real projects
- Startups validating AR product ideas quickly

## What's Inside

- AR 360 templates
- Face mesh tracking templates
- Marker-based image tracking templates
- QR anchored tracking templates
- WebXR surface tracking templates
- Multi-tracking ready samples (up to 100 images and QR codes)

## Usage

```bash
npx create-webar-app my-ar
```

## Modes

```bash
npx create-webar-app my-ar --mode image
npx create-webar-app my-ar --mode face
npx create-webar-app my-ar --mode qr
npx create-webar-app my-ar --mode webxr
npx create-webar-app my-ar --mode ar-360
```

Short flags:

```bash
npx create-webar-app my-ar --image
npx create-webar-app my-ar --face
npx create-webar-app my-ar --qr
npx create-webar-app my-ar --webxr
npx create-webar-app my-ar --ar360
```

## Tracking Types Breakdown

### ar-360
Type: 360 environment tracking (device orientation)  
Use case: immersive panoramic scenes without marker or plane detection  
Ideal for: virtual tours, interactive storytelling, product showcases in skybox

### face
Type: Face mesh tracking  
Use case: overlay AR content on user face landmarks  
Ideal for: face filters, virtual try-on, selfie effects

### image
Type: Marker-based image recognition  
Use case: attach AR content to printed visuals  
Ideal for: brochures, posters, business cards, packaging

### qr
Type: QR code anchored tracking  
Use case: use QR as an AR anchor in scene  
Ideal for: print-to-AR campaigns, events, education triggers

### webxr
Type: Real-world surface tracking via WebXR  
Use case: detect planes and place digital objects in physical space  
Ideal for: product placement previews, AR furniture, persistent spatial AR

Note: WebXR mode requires compatible browsers and HTTPS.

## Tracking Modes Comparison

| Tracking Mode | Markerless | Image/QR Required | Best For | Browser Support |
| --- | --- | --- | --- | --- |
| `ar-360` | Yes | No | 360 tours, immersive scenes | Modern mobile browsers |
| `face` | Yes | No | Face filters, try-ons | Front-camera supported browsers |
| `image` | No | Yes | AR on printed materials | WebGL/WebRTC capable browsers |
| `qr` | No | Yes | QR-triggered AR campaigns | Camera-capable browsers |
| `webxr` | Yes | No | Surface tracking, product previews | WebXR-supported browsers |

## Extra options

- `--template <name>` and `--type <name>` map to mode.
- `--pm npm|pnpm|yarn`
- `--install` / `--no-install`
- `--yes`

## API Key

Generated apps include `.env` with a test `VITE_API_KEY`:
- Can be used for development and commercial projects.
- Test key limit: up to 15000 views per month per domain.

## Support and API key requests

- https://t.me/was_team
- support@web-ar.studio
- https://discord.gg/4q5dbAb4GZ

Main repo: https://github.com/WebAR-Studio/open-webar-sdk
