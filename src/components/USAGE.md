# UI Components Usage

This branch adds a set of reusable, lightly-styled components.

Files added under src/components/

- Dropdown
- Carousel
- DragDropArea (and DraggableList)
- charts/AdvancedChart
- global styles: src/styles/global.css

Quick setup notes
1. Add `import './styles/global.css'` in your app entry (e.g., src/main.tsx) so the font and color variables are available.
2. These components assume React + TypeScript. If you use Tailwind, the classes will align well; otherwise the components include minimal inline styles for colors/borders.
3. Charts require `recharts` as a dependency.

Suggested next steps (I can do this for you):
- Add small Storybook stories for each component.
- Add unit tests with React Testing Library.

