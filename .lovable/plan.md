
# Fix Current Selection Hover Image Behavior

## Problems Identified

1. **Image persists when scrolling**: When you scroll past the section, the `onMouseLeave` event never fires because the mouse doesn't physically leave - the element scrolls away beneath it. The image stays stuck on screen.

2. **Image disappears while hovering**: The current logic with `setTimeout` delays is causing race conditions where the image flickers or disappears unexpectedly.

## Solution

### 1. Add Scroll Detection to Clear Image

Use a `useEffect` hook with a scroll listener that checks if the cursor is still within a brand row. When scrolling occurs:
- Get all brand row elements using refs
- Check if the current mouse position is still within any brand row's bounding rectangle
- If not, clear the hovered brand state

### 2. Simplify Hover Logic

Remove the problematic `setTimeout` delays that cause flickering:
- Set `hoveredBrand` and `isVisible` directly on mouse enter
- Clear both states directly on mouse leave
- Let CSS transitions handle the smooth animation

### 3. Track Mouse Position Globally

Store mouse position in a ref (not just state) so we can check it during scroll events without triggering re-renders.

## Technical Implementation

### File: `src/components/vpo/CurrentSelectionSection.tsx`

**Changes:**

1. Add `useRef` and `useEffect` imports
2. Create a ref to track the section element
3. Create a ref to store current mouse coordinates (for scroll checking)
4. Add scroll event listener that:
   - Gets the current cursor position
   - Uses `document.elementFromPoint()` to check what element is under cursor
   - If cursor is not over any brand row, clears the hover state
5. Simplify `handleBrandHover` to remove race-condition-causing `setTimeout`:
   - On enter: immediately set both `hoveredBrand` and `isVisible` to true
   - On leave: immediately set `isVisible` to false, then clear `hoveredBrand` after animation
6. Add cleanup for scroll listener on unmount

```text
Logic flow:
┌─────────────────────────────────────────────────────────────┐
│  Mouse enters brand row                                     │
│  → Set hoveredBrand = brand.id                              │
│  → Set isVisible = true                                     │
│  → Image fades in (CSS transition handles animation)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Mouse leaves brand row (moves to another or empty space)   │
│  → Set isVisible = false                                    │
│  → Image fades out (CSS transition)                         │
│  → After 500ms, clear hoveredBrand                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  User scrolls (mouse stays still, elements move)            │
│  → Scroll event fires                                       │
│  → Check: is cursor still over a brand row?                 │
│  → If YES: update hoveredBrand to that brand                │
│  → If NO: clear states (image fades out)                    │
└─────────────────────────────────────────────────────────────┘
```

## Summary

| Issue | Solution |
|-------|----------|
| Image stays when scrolling past section | Add scroll listener to detect when cursor leaves brand rows |
| Image disappears while hovering | Remove setTimeout delays, use direct state updates |
| Smooth animation | Keep CSS transitions, they handle the visual smoothness |
