

# Premium Cinematic Zoom Effect for Runway Image

## Problem Analysis

The current implementation uses `ease-out` which starts the animation at full speed, then slows down. This makes the initial movement feel "instant" even though the full animation is 4 seconds. For a truly premium, sleek effect, we need:

1. A custom easing curve that starts very slowly
2. A longer duration for maximum cinematic impact
3. Potentially using will-change for smoother GPU-accelerated rendering

## Solution: Ultra-Premium Cinematic Effect

### Custom Cubic-Bezier Easing

Instead of `ease-out`, we'll use a custom easing curve that:
- Starts extremely slowly (creating anticipation)
- Gradually accelerates in the middle
- Eases out gently at the end

Recommended curve: `cubic-bezier(0.05, 0.5, 0.3, 1)` - This creates a "slow build" effect that feels luxurious and intentional.

### Implementation Details

**File: `src/components/vpo/RunwaySection.tsx`**

Update line 58 with inline style for the custom cubic-bezier (since Tailwind doesn't support custom easing):

```jsx
<img
  src="https://images.unsplash.com/..."
  alt="Runway Model"
  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110"
  style={{
    transition: 'transform 5s cubic-bezier(0.05, 0.5, 0.3, 1), opacity 3s cubic-bezier(0.05, 0.5, 0.3, 1)',
    willChange: 'transform, opacity'
  }}
/>
```

**Key Changes:**
- Transform duration: 5 seconds (for the ultra-slow zoom)
- Opacity duration: 3 seconds (slightly faster for the fade-in)
- Custom easing: `cubic-bezier(0.05, 0.5, 0.3, 1)` - starts at only 5% speed, accelerates gradually
- Added `willChange: 'transform, opacity'` for GPU acceleration and smoother rendering

### Visual Timeline

```text
Time:     0s -------- 1s -------- 2s -------- 3s -------- 4s -------- 5s
          |           |           |           |           |           |
Zoom:     100% ------ 101% ------ 103% ------ 106% ------ 108% ------ 110%
          ↑           ↑           ↑           ↑           ↑           ↑
          Start       Slow        Building    Faster      Slowing     End
          (barely     climb       momentum    now         down        (settled)
          moving)
```

### Alternative: Add to Global CSS

If you prefer keeping styles in CSS rather than inline, we can also add a custom utility class in `src/index.css`:

```css
.runway-zoom-premium {
  transition: transform 5s cubic-bezier(0.05, 0.5, 0.3, 1), 
              opacity 3s cubic-bezier(0.05, 0.5, 0.3, 1);
  will-change: transform, opacity;
}
```

Then apply it:
```jsx
className="... runway-zoom-premium group-hover:opacity-90 group-hover:scale-110"
```

## Summary

| Aspect | Current | Premium Update |
|--------|---------|----------------|
| Duration | 4s | 5s (transform), 3s (opacity) |
| Easing | ease-out (starts fast) | cubic-bezier(0.05, 0.5, 0.3, 1) (starts very slow) |
| GPU Acceleration | None | will-change: transform, opacity |
| Feel | Quick start, slow end | Slow build, luxurious motion |

This creates that "fashion editorial" feel where the zoom seems to creep in almost imperceptibly at first, then gracefully settles into its final position.

