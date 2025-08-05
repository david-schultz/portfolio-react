# Background context
Currently, src/app/demos/arboretum/page.tsx uses <ArboretumExplorer/> to visualize an interactive D3.js visualization. <ArboretumExplorer/> handles interactivity; i.e. data filtering. Its child component, <ArboretumVis/>, handles rendering; it contains panels that describe the data. Grid cells can be clicked, in order to update a card that shows the current selection.

# The task
This code needs to be refactored, such that:
- Data descriptions should be moved into a separate component (inside ArboretumDataControls.tsx).
- Filter interactivity should be moved into a separate component (inside ArboretumDataControls.tsx).
- Data rendering (grid, grid cells) should be done inside ArboretumVisualizer.tsx.
- Grid cell interactivity should be done inside ArboretumVisualizer.tsx.
- Computation and handling of data should be done inside ArboretumExplorer.ts.

Each of these components will be referenced in src/app/demos/arboretum/page.tsx. If I understand correctly, this is where state will be tracked.

# Implementation details
Your work should primarily be done in four files in src/app/demos/arboretum:
- page.tsx
- components/ArboretumDataControls.tsx
- components/ArboretumVisualization.tsx
- lib/ArboretumExplorer.ts

Do not change anything inside <ArboretumExplorer/> or <ArboretumVis/>. Only use them to inform you of your work in these four files.

Do not implement anything yet. Advise me on implementation strategies. Consider how data inside <Overview />, <CurrentSelection/> and <ArboretumVisualizer/> will be updated when the user interacts with (1) the controls inside <DataControls/>, and (2) the clickable grid cells..
