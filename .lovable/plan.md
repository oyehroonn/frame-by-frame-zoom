
# Fix GLB Model Texture and Color Quality in Model Viewer

## Problem
The 3D models on the Editorial page (`/gallery`) are displaying with dull colors, lost detail, and washed-out patterns. The GLB files contain rich textures and materials, but they're not rendering correctly.

## Root Cause
The current `<model-viewer>` implementation is missing proper **environment lighting**. Without an environment image, PBR (Physically Based Rendering) materials cannot display realistic reflections, which makes:
- Colors appear flat and desaturated
- Metallic/reflective surfaces look matte
- Fine texture details become invisible
- Overall visual quality degrades significantly

## Solution
Enhance the `GLBViewer` component with proper lighting and rendering attributes:

1. **Add `environment-image="neutral"`** - Uses Google's neutral studio lighting optimized for accurate color reproduction
2. **Set `tone-mapping="neutral"`** - Khronos PBR Neutral tone mapper for e-commerce accuracy  
3. **Increase `exposure`** - Slightly boost to `1.2` for better brightness
4. **Add `interpolation-decay`** - Smoother camera movements
5. **Remove shadow attributes** - Shadows can interfere with model visibility

---

## Technical Changes

### File: `src/components/gallery/GLBViewer.tsx`

**Current model-viewer attributes:**
```jsx
<model-viewer
  src={modelUrl}
  alt={labelText}
  camera-controls
  touch-action="pan-y"
  shadow-intensity="1"
  exposure="1"
  shadow-softness="0.5"
  style={{...}}
/>
```

**Updated model-viewer attributes:**
```jsx
<model-viewer
  src={modelUrl}
  alt={labelText}
  camera-controls
  touch-action="pan-y"
  environment-image="neutral"
  tone-mapping="neutral"
  exposure="1.2"
  shadow-intensity="0.8"
  shadow-softness="1"
  interpolation-decay="75"
  style={{...}}
/>
```

### Key Attribute Additions

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `environment-image` | `"neutral"` | Provides studio-quality lighting for accurate colors |
| `tone-mapping` | `"neutral"` | Khronos PBR Neutral - designed for e-commerce color accuracy |
| `exposure` | `"1.2"` | Slightly brighter to compensate for neutral lighting |
| `interpolation-decay` | `"75"` | Smoother camera transitions |
| `shadow-intensity` | `"0.8"` | Reduced slightly to not overpower the model |
| `shadow-softness` | `"1"` | Maximum softness for subtle, realistic shadows |

---

## Alternative: Custom HDR Environment

If the neutral lighting still doesn't achieve the desired look, we can use a custom HDR environment image from a free source like Poly Haven:

```jsx
environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr"
```

This would provide:
- More dramatic studio lighting
- Enhanced reflections on metallic/glossy materials
- Professional product photography aesthetic

---

## Expected Results

After these changes, the 3D models will display:
- Full color saturation matching the original GLB files
- Visible texture patterns and fine details
- Realistic material properties (metallic shine, fabric weave, etc.)
- Proper lighting that reveals the model's form and depth
