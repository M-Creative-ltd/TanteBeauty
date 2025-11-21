<!-- e55b19ed-0c15-4e6d-9e57-c6e968ac7763 fbebbd1a-1c82-49cb-aff8-59ec8fb7e845 -->
# Horizontal Scroll Implementation (Updated)

## 1. Services Section Updates

We will convert the service grid into a unified horizontal scrollable list that auto-updates the "focused" service based on the scroll position.

### `app/components/sections/ServicesSection/ServicesSection.tsx`

-   **Structure**: Replace the `grid` layout with a `flex` container (`overflow-x-auto`, `snap-x`, `no-scrollbar`).
-   **Item Styling**: Set service items to a fixed width (e.g., `w-[40%] md:w-[25%]`) and add `snap-center` to center them after scrolling.
-   **Auto-Focus Logic**:
    -   Attach a `scroll` event listener to the container.
    -   Calculate which item is closest to the center of the container.
    -   Update `focusedServiceIndex` state automatically as the user scrolls.
    -   Retain the click-to-focus functionality as well (scrollTo logic).
-   **Mouse Wheel Interaction**: Add a `wheel` event listener to the container. If the user scrolls the wheel while hovering, hijack the vertical scroll and convert it to horizontal scroll for this container.
-   **Hover Effects**: Add cursor styling (e.g., `cursor-grab` or custom cursor) to indicate scrollability.

## 2. Products Section Updates

We will modify the product grid to support horizontal scrolling. This will now be a single row on ALL screen sizes.

### `app/components/sections/ProductsSection/ProductsSection.tsx`

-   **Layout**: Render products in a single horizontal scrollable row (`flex`, `overflow-x-auto`) for both mobile and desktop. (Removing the multi-row chunking logic).
-   **Styling**: Apply `snap-x` and `snap-start` for smooth scrolling experiences.
-   **Mouse Wheel Interaction**: Add a `wheel` event listener to the container to convert vertical wheel scroll into horizontal movement when hovering over the list.
-   **Hover Effects**: Add cursor styling to indicate scrollability.

### To-dos

- [x] Modify ServicesSection to use horizontal scrolling and implement auto-focus on scroll
- [x] Refactor ProductsSection to display products in scrollable horizontal rows (single row on mobile, multiple rows on desktop)