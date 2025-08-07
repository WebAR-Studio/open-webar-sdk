# WebAR‑SDK‑Samples

**Official Web‑AR.Studio SDK Samples**  
Create powerful browser-based AR experiences in minutes using real, working examples.

---

## 🚀 Why This Repo Matters

If you're a developer exploring WebAR, you probably struggle with one (or all) of these:

- 😵 WebAR feels complex, with scattered docs and inconsistent examples
- 🔄 Repeating boilerplate setup again and again
- 🧪 You want quick proof-of-concept demos, not a 3-week setup
- 📱 You're tired of native apps—users won’t install them
- 💼 You need to **show results fast** to clients, bosses, or stakeholders

This repo solves that by providing **ready-to-run, production-grade examples** for every major tracking mode supported by [WebAR.Studio](https://web-ar.studio).

Just clone → run → customize → ship.

---

## 🎯 Who Is This For?

- **Web Developers** building immersive sites
- **Marketing & Creative Agencies** deploying campaign-driven AR
- **E-commerce Teams** prototyping try-on or product previews
- **Educators & Students** learning AR through real-world code
- **Startups & Innovators** pitching new ideas with wow factor

---

## 📦 What's Inside

The repo includes hands-on, modular examples for all major tracking modes:

- ✅ AR in 360° environments
- ✅ Face mesh tracking for filters and accessories
- ✅ Marker-based image tracking
- ✅ QR-code anchored AR
- ✅ WebXR-based real-world surface tracking

Each folder is a complete, runnable demo.

---

## 🔍 Tracking Types Breakdown

### 🌀 ar-360-tracking

**Type:** 360° Environment Tracking (Device Orientation)  
**Use Case:** Immersive panoramic scenes without any marker or plane detection.  
**Ideal For:**  
- Virtual tours  
- Interactive storytelling  
- Product showcases in skybox

---

### 👤 face-tracking

**Type:** Face Mesh Tracking  
**Use Case:** Overlay AR content on the user’s face using facial landmarks.  
**Ideal For:**  
- Face filters  
- Virtual try-ons (glasses, makeup, accessories)  
- Interactive selfie effects

---

### 🖼️ image-tracking

**Type:** Marker-Based Image Recognition  
**Use Case:** Attach AR content to printed visuals.  
**Ideal For:**  
- Augmented brochures/posters  
- Business cards  
- Packaging with hidden AR layers

---

### 🔳 qrcode-tracking

**Type:** QR Code Anchored Tracking  
**Use Case:** Use a QR code as an anchor to place AR content in the scene.  
**Ideal For:**  
- Print-to-AR campaigns  
- Events and installations  
- Educational material triggers

---

### 🌐 webxr-tracking

**Type:** Real-World Surface Tracking via WebXR  
**Use Case:** Detect horizontal/vertical planes to place digital objects in the physical world.  
**Ideal For:**  
- Product placement previews  
- AR furniture visualization  
- Persistent spatial AR

> ⚠️ Requires WebXR-compatible browsers (e.g. Chrome on Android) + HTTPS.

---

## 📊 Tracking Modes Comparison

| Tracking Mode      | Markerless | Image/QR Required | Best For                            | Browser Support              |
|--------------------|------------|-------------------|--------------------------------------|------------------------------|
| `ar-360-tracking`  | ✅         | ❌                | 360° tours, immersive scenes         | All modern mobile browsers   |
| `face-tracking`    | ✅         | ❌                | Face filters, try-ons                | Front-camera supported       |
| `image-tracking`   | ❌         | ✅                | AR on printed materials              | Broad (WebGL/WebRTC capable) |
| `qrcode-tracking`  | ❌         | ✅                | QR-triggered AR, marketing           | All camera-supported         |
| `webxr-tracking`   | ✅         | ❌                | Surface tracking, product previews   | WebXR-supported only         |

---

## 🛠️ Quick Start

```bash
git clone https://github.com/WebAR-Studio/webar-sdk-samples.git
cd webar-sdk-samples
# Open an example (HTML file) using your browser or a local server

