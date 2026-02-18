# VPO — Virtual Private Outlet

VPO is a concept web experience for a virtual luxury fashion destination. Think of it as a digital flagship store — part editorial, part showroom, part members-only club — built entirely in the browser.

The site presents high-end fashion brands (Celine, Valentino, Prada, Rick Owens, Hermès, Chanel, etc.) through a cinematic scroll-driven interface with 3D elements, frame-sequence animations, and glassmorphic UI treatments.

---

## What's inside

**Landing & Hero**
Scroll-triggered frame sequence that zooms the user into the environment, powered by GSAP ScrollTrigger and canvas-based image sequences.

**Manifesto**
Full-bleed typographic section laying out VPO's vision — "Fashion is not just seen. It is entered."

**Spaces**
Interactive map-style section with brand waypoints (Chanel, Hermès) plotted on a spatial grid. Hover to preview each brand's virtual space.

**Current Selection**
Curated brand list with large hover-reveal imagery. Brands include Celine, Valentino, Prada, and Rick Owens with location tags.

**The Runway**
Live broadcast schedule UI for virtual fashion shows. Features a lobby system where users can invite friends, pick brands, and join private viewing rooms together.

**Districts**
Overview of themed brand neighborhoods (Comme des Garçons, Issey Miyake, Yohji Yamamoto) with architectural grid overlays.

**Access / Membership**
Tiered membership model (Atelier tier at $299/season) with perks like global inventory storage, cross-district teleportation, and private lobby hosting.

**Journal**
Editorial feed — articles on digital tactility, procedural generation, and brand collaborations.

**Gallery / Editorial**
Separate page with a warm-toned editorial layout, 3D model viewers (GLB/GLTF via React Three Fiber), and an experience container for immersive product exploration.

**Waitlist & Footer**
Email capture for early access, copyright, and social links.

---

## Design notes

- Dark-first palette (`#050505` / `#080808` backgrounds) with stone and off-white accents
- Glassmorphic navigation bar — transparent by default, `backdrop-blur-md` on hover with a 500ms transition
- Scroll-reveal animations on almost every section via a reusable `ScrollReveal` component
- Grain overlay textures for editorial feel
- Grid-pattern backgrounds on light sections
- Serif + sans-serif type pairing, heavy use of tracking and uppercase micro-labels

---

## Tech stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3.4 + tailwindcss-animate |
| Components | shadcn/ui (Radix primitives) |
| 3D | Three.js + React Three Fiber + Drei |
| Animation | GSAP (ScrollTrigger) |
| Routing | React Router v6 |
| Icons | Lucide React |

---

## Running locally

```sh
npm install
npm run dev
```

Requires Node.js 18+.

---

## Project structure (key paths)

```
src/
├── pages/
│   ├── Index.tsx              # Main landing page
│   ├── GalleryEditorial.tsx   # Editorial / 3D gallery
│   └── ...
├── components/
│   ├── vpo/                   # All VPO-specific sections
│   │   ├── Navigation.tsx
│   │   ├── ManifestoSection.tsx
│   │   ├── SpacesSection.tsx
│   │   ├── CurrentSelectionSection.tsx
│   │   ├── RunwaySection.tsx
│   │   ├── DistrictsSection.tsx
│   │   ├── AccessSection.tsx
│   │   ├── JournalSection.tsx
│   │   ├── LobbyModal.tsx
│   │   ├── WaitlistFooter.tsx
│   │   └── ...
│   ├── gallery/               # 3D viewers & editorial components
│   ├── FrameSequence.tsx      # Canvas frame-sequence (hero)
│   ├── FrameSequenceScene2.tsx
│   ├── ScrollReveal.tsx       # Reusable scroll-triggered reveal
│   └── ui/                    # shadcn/ui primitives
└── index.css                  # Global styles, grain overlays, editorial captions
```

---

## Status

v0.9 Beta — currently waitlist-only. Wallet connect and full membership flows are placeholder UI.
