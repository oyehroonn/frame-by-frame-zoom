

# Fix Frame Sequence Scroll Timing

## Problem Identified

The `FrameSequenceScene2` currently uses **GSAP ScrollTrigger with scrub**, which means the animation progress is tied directly to the scroll position of the page. This causes two issues:

1. **Early triggering**: The ScrollTrigger starts calculating animation progress as soon as the container enters the viewport area, even while you're still scrolling through the `CurrentSelectionSection` above it
2. **Passive scroll control**: The animation advances based on global page scroll, not based on whether your mouse is hovering over the experience

## Root Cause

The current implementation uses:
```javascript
scrollTrigger: {
  trigger: container,
  start: "top top",
  scrub: 1.5,  // This ties animation to global scroll position
  pin: true,
  ...
}
```

This approach calculates frame progress based on how far you've scrolled past the trigger point - but scroll distance is accumulated even while you're scrolling through sections above it (due to content overlapping with the pinned container).

## Solution

Convert `FrameSequenceScene2` to use the **hover-based wheel event** approach, matching the pattern already established in `ExperienceContainer`. This means:

1. **Remove GSAP ScrollTrigger scrub** - Stop tying animation to global scroll position
2. **Add hover detection** - Track when mouse is over the container
3. **Use wheel event listener** - Only advance frames when hovering AND scrolling
4. **Allow scroll passthrough at boundaries** - When at frame 0 (scrolling up) or frame 250 (scrolling down), let normal page scrolling resume

---

## Technical Implementation

### File: `src/components/FrameSequenceScene2.tsx`

**Changes:**

1. **Add hover state tracking**
   - Add `isHovering` state with `useState`
   - Add `onMouseEnter` and `onMouseLeave` handlers to the container

2. **Replace ScrollTrigger animation with wheel event handler**
   - Remove the GSAP timeline with ScrollTrigger scrub
   - Add a wheel event listener that only activates when `isHovering` is true
   - Implement boundary detection to allow normal scroll when at frame 0 or 250

3. **Handle mobile touch events**
   - Add touch start/move handlers for mobile devices
   - Same boundary logic for touch scrolling

4. **Visual feedback**
   - Add a "Scroll to explore" indicator that appears on hover
   - Show a progress indicator during the experience

**Key code pattern (from ExperienceContainer):**
```text
const handleWheel = (e: WheelEvent) => {
  if (!isHovering) return; // Only capture when hovering
  
  // At end, scrolling down -> let page scroll
  if (currentFrame >= maxFrame && delta > 0) return;
  
  // At start, scrolling up -> let page scroll  
  if (currentFrame <= 0 && delta < 0) return;
  
  // Otherwise, capture scroll for animation
  e.preventDefault();
  // ... advance/reverse frames
};
```

---

## Expected Behavior After Fix

1. You scroll down through `CurrentSelectionSection` normally
2. `FrameSequenceScene2` comes into view showing **frame 0** (first frame)
3. When your mouse hovers over the experience and you scroll:
   - Animation advances through frames 0-250
4. When animation reaches frame 250 and you continue scrolling down:
   - Normal page scrolling resumes, taking you to the next section
5. If you scroll up at frame 0:
   - Normal page scrolling resumes, taking you back to `CurrentSelectionSection`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/FrameSequenceScene2.tsx` | Replace ScrollTrigger scrub with hover-based wheel events |

