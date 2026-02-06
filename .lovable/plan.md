
# VPO Section Integration Plan

## Overview

This plan integrates the new sections from the HTML mock into the existing VPO landing page. The sections will be added **after the QuoteSection** and will **replace the current Footer** with the new WaitlistFooter. The integration preserves all premium micro-interactions from the mock while maintaining theme consistency.

## Current Page Structure

```text
TopTicker
Navigation
FrameSequence (Hero)
ManifestoSection
SpacesSection
CurrentSelectionSection
FrameSequenceScene2
QuoteSection <- FINAL TEXT SECTION
Footer       <- WILL BE REPLACED
```

## New Page Structure

```text
TopTicker
Navigation (UPDATED - sticky blur, scroll anchors)
FrameSequence (Hero)
ManifestoSection
SpacesSection
CurrentSelectionSection
FrameSequenceScene2
QuoteSection
--- NEW SECTIONS ---
RunwaySection       id="runway"    (dark: #080808)
DistrictsSection    id="spaces"    (light: #F5F5F0)
AccessSection       id="account"   (dark: #111111)
JournalSection      id="journal"   (light: #FDFBF7)
WaitlistFooter                     (dark: #050505)
```

---

## Files to Create

### 1. src/components/vpo/RunwaySection.tsx

**Purpose**: Live runway broadcast section with cinematic dark theme

**Key Features**:
- Dark background (#080808) with border-t border-white/10
- Header with "Live Broadcast" red indicator and "The Runway" serif title
- Act tabs (Genesis, Void, Bloom) with active state styling
- Main stage image (70vh) with:
  - Live feed indicator (pulsing red dot + "Live Feed - Cam 04")
  - Gradient overlay from bottom with look info
  - Shopping bag button with hover inversion
  - **Cinematic zoom on hover**: `group-hover:scale-105 transition-transform duration-[2s]`
- Side panel with:
  - Drop Schedule list with hover brightness transitions
  - Social lobby card with avatar stack
  - "Create Lobby" button with **white/black inversion**: `hover:bg-white hover:text-black`

**Interactions Preserved**:
- Main image: `opacity-80 group-hover:scale-105 transition-transform duration-[2s]`
- Schedule items: `opacity-50 hover:opacity-100` and `text-stone-500 group-hover:text-white`
- Create Lobby: `border border-white/20 hover:bg-white hover:text-black transition-colors`

---

### 2. src/components/vpo/DistrictsSection.tsx

**Purpose**: World navigation map with light editorial theme

**Key Features**:
- Light background (#F5F5F0) with grid pattern overlay at 3% opacity
- Centered header with "World Navigation" label and "Districts and Ateliers" title
- Two-column layout:
  - Left sidebar (1/3): District info card with:
    - Current location indicator (green dot)
    - District name with serif italic styling
    - Brand list (Comme des Garcons, Issey Miyake, Yohji Yamamoto) with arrow reveal on hover
    - "Teleport to District" dark button
  - Right map area (2/3):
    - Abstract SVG lines and concentric circles
    - Interactive node markers:
      - Paris: small dot with label reveal on hover
      - Tokyo: active node with ping animation and permanent label
      - Milan: small dot with label reveal on hover

**Interactions Preserved**:
- Brand list items: `group cursor-pointer` with arrow `opacity-0 group-hover:opacity-100`
- Map nodes: `group-hover:scale-150 transition-transform duration-300`
- Active node ping: `animate-ping` on border

---

### 3. src/components/vpo/AccessSection.tsx

**Purpose**: VPO Membership card with premium dark theme

**Key Features**:
- Dark background (#111111) with stone-800 border-t
- Two-column grid layout:
  - Left column:
    - "03 - Private Access" label
    - "The VPO Membership." headline with italic accent
    - Description paragraph
    - Benefits list with check icons (Global Inventory, Teleportation, Lobby Hosting)
    - "View Tiers and Benefits" underline link
  - Right column - **Premium Membership Card**:
    - Glow effect behind (blur-[80px])
    - Card with gradient background and 1.586:1 aspect ratio
    - VPO logo + holographic chip element
    - Member ID and Tier display
    - **3D tilt on hover**: `hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-500`
    - **Holographic shine overlay**: gradient that appears on hover
    - **Shimmer animation** on chip border
    - "Access Vault" button below card

**Interactions Preserved**:
- Card: CSS 3D transform with `perspective-1000` parent
- Shine overlay: `opacity-0 group-hover:opacity-100 transition-opacity duration-500`
- Shimmer: `animate-[shimmer_2s_infinite]` keyframe

---

### 4. src/components/vpo/JournalSection.tsx

**Purpose**: Editorial article grid with light theme

**Key Features**:
- Light background (#FDFBF7) with stone-200 border-t
- Header with "The Journal" title and "View Archive" link
- 3-column article grid:
  - Each article card:
    - 4:5 aspect ratio image container
    - Category badge (Editorial, Tech, Collab) positioned top-left
    - Date label
    - Headline with serif italic styling
    - Description paragraph
    - **Grayscale to color on hover**: `grayscale group-hover:grayscale-0 transition-all duration-700`
    - **Underline on headline hover**: `group-hover:underline decoration-1 underline-offset-4`

**Interactions Preserved**:
- Images: `grayscale group-hover:grayscale-0 transition-all duration-700 ease-out`
- Headlines: `group-hover:underline decoration-1 underline-offset-4 decoration-stone-300`

---

### 5. src/components/vpo/WaitlistFooter.tsx

**Purpose**: Waitlist CTA and footer replacing current Footer

**Key Features**:
- Dark background (#050505) with border-t border-white/5
- Centered content section:
  - "Join the Vanguard." serif headline
  - Description paragraph
  - Email form with underline input styling
  - Focus state: `focus-within:border-white transition-colors`
  - "Request Access" button
- Bottom bar:
  - Copyright notice
  - Social links (Instagram, Twitter, Discord) with hover states

---

## Files to Modify

### 6. src/components/vpo/Navigation.tsx

**Changes**:
- Add scroll state tracking with useState and useEffect
- Apply **glassmorphism on hover/scroll**: `group hover:bg-black/80 hover:backdrop-blur-md`
- Update nav items to include scroll anchors:
  - Editorial -> /gallery (Link)
  - Runway -> #runway (anchor)
  - Spaces -> #spaces (anchor)  
  - Journal -> #journal (anchor)
  - Access -> #account (anchor)
- Add "Connect Wallet" button matching mock styling
- Add version indicator "v.0.9 Beta"

**Exact styles from mock**:
```css
nav class="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white 
           transition-all duration-500 group hover:bg-black/80 
           hover:backdrop-blur-md border-b border-white/5"
```

---

### 7. src/pages/Index.tsx

**Changes**:
- Import new section components
- Remove Footer import
- Add WaitlistFooter import
- Update component order:

```tsx
<QuoteSection />
<RunwaySection />
<DistrictsSection />
<AccessSection />
<JournalSection />
<WaitlistFooter />
```

---

### 8. src/index.css

**Additions**:
- Add `scroll-smooth` to html element
- Add Playfair Display font import for mock consistency
- Add custom utility classes:
  - `.perspective-1000` for 3D card effect
  - `.transform-style-3d` for preserve-3d
  - Shimmer keyframe animation

**CSS additions**:
```css
html {
  scroll-behavior: smooth;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}
```

---

### 9. tailwind.config.ts

**Additions**:
- Add Playfair Display to font stack as alternative serif
- Add shimmer keyframe animation
- Add custom animation for shimmer

```ts
fontFamily: {
  serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
  // ...
},
keyframes: {
  // existing keyframes...
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
},
animation: {
  // existing animations...
  shimmer: 'shimmer 2s infinite',
},
```

---

## Theme Color Mapping

| Section | Mock Color | Implementation |
|---------|-----------|----------------|
| Runway | #080808 | `bg-[#080808]` |
| Districts | #F5F5F0 | `bg-[#F5F5F0]` |
| Access | #111111 | `bg-[#111111]` |
| Journal | #FDFBF7 | `bg-[#FDFBF7]` |
| Waitlist | #050505 | `bg-[#050505]` |

---

## Interaction Summary

| Element | Interaction | CSS Classes |
|---------|------------|-------------|
| Runway image | Cinematic zoom | `group-hover:scale-105 transition-transform duration-[2s]` |
| Drop schedule | Brightness on hover | `opacity-50 hover:opacity-100`, `text-stone-500 group-hover:text-white` |
| Create Lobby | Color inversion | `hover:bg-white hover:text-black transition-colors` |
| Map nodes | Scale up | `group-hover:scale-150 transition-transform duration-300` |
| Membership card | 3D tilt + shine | `hover:rotate-y-6 hover:rotate-x-6`, holographic overlay |
| Journal images | Grayscale to color | `grayscale group-hover:grayscale-0 transition-all duration-700` |
| Journal headlines | Underline reveal | `group-hover:underline decoration-1 underline-offset-4` |
| Navigation | Blur on hover | `group hover:bg-black/80 hover:backdrop-blur-md` |

---

## Smooth Scrolling Implementation

Navigation anchor clicks will trigger smooth scroll via:
1. CSS `scroll-behavior: smooth` on html
2. Native anchor links (`#runway`, `#spaces`, etc.)
3. Section IDs matching nav hrefs

---

## Implementation Order

1. Update `src/index.css` with scroll-smooth and utility classes
2. Update `tailwind.config.ts` with Playfair Display and shimmer animation
3. Create `RunwaySection.tsx`
4. Create `DistrictsSection.tsx`  
5. Create `AccessSection.tsx`
6. Create `JournalSection.tsx`
7. Create `WaitlistFooter.tsx`
8. Update `Navigation.tsx` with glassmorphism and scroll anchors
9. Update `Index.tsx` to use new sections

---

## Responsive Considerations

- All sections follow mock's responsive patterns with `md:` and `lg:` breakpoints
- Map sidebar shows on mobile, map visual hidden on smaller screens (`hidden lg:block`)
- Article grid collapses to single column on mobile
- Navigation adapts with hidden elements on mobile

---

## Image Assets

The mock uses Unsplash placeholder images. These will be preserved as external URLs:
- Runway: `https://images.unsplash.com/photo-1537832816519-689ad163238b`
- Journal 1: `https://images.unsplash.com/photo-1500917293891-ef795e70e1f6`
- Journal 2: `https://images.unsplash.com/photo-1483985988355-763728e1935b`
- Journal 3: `https://images.unsplash.com/photo-1469334031218-e382a71b716b`
