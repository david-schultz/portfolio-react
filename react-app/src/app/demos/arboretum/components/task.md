In OverviewFilterCard.tsx, there is a dialog which allows the user to apply filters to the current dataset. Your task is to implement this filtering functionality with the following requirements.

## Describe & clear filters
When a filter is applied, there will be some number of species selected. The user needs to be able to see how many filters are applied (or in other words, how many species are selected), and have the ability to clear all filters.

Outside of the <DialogContent>, this should be handled by a button, whose text says how many filters are applied. When clicked, the button should clear all filters. An example of this button can be seen on line 129, where the button contains "8 applied <Xmark/>". This button should only be shown when there are filters applied.

Inside the <DialogContent>, there will be a row under the <DialogTitle> which should meet the following requirements:
- When no filters are selected, it should contain the text "No filters applied," followed by a <span> element that says how many species are in the dataset.
- When a filter is selected, it should contain one button for each family, followed by a <span> element that says how many species are selected. The button(s) should contain the name of the family, and an Xmark. When clicked, the button should clear all filters associated with that family.

## Close/Apply buttons
When the close button is clicked, it should close the dialog, without making any changes to the currently selected filters.

While in the dialog, filters can be selected, but they should not be applied to the dataset. They should only be applied when the user clicks the apply button. The apply button should be disabled, UNLESS:
- The user has made changes to the current dataset.
- There are currently selected filters.

Clicking the apply button should close the dialog.

## Search input
When the user inputs text, the table should only show rows that match text. When the search input corresponds to a specific species, its collapsible/expandable parent (which displays the family) should still be shown. However, other species under the same parent should not be shown if they don't match the inputted text.

The user should be able to search for both family and species names. Search should be case-insensitive and match partial strings.

## Table and nested rows
The table allows users to scroll through all families/species; view how many accessions are in each; select families/species to apply a filter.

The top-level headers should be family, and accessions. Rows should be automatically sorted by accessions. However, the user may reverse the order, or sort by families. Use NavArrowDownSolid and NavArrowUpSolid from iconoir-react. Sorting by accessions means total family accessions.

There should be no checkbox in the header row.

### Nested rows
The table uses nested rows. The parent should be for the family; the children should be for each species in the family.

The current code describes an attempt at nested rows; however, this implementation is broken, and serves only to describe a possible configuration. You should override it with your own implementation.

Each parent row should have a button for accordion functionality, then a checkbox, and then the family name + accession count.

Each child row should be indented to align with the family name; it should have a checkbox, then the species name + accession count.


### Accordions
Nested rows should function like accordions. Accordions should, by default, be closed. Use NavArrowRight or NavArrowDown from iconoir-react.

You may notice that there is already an accordion.tsx element under @/components/ui. Do not make any changes to this element. Instead, create a new component specifically for the nested row. It may use the headless radix-ui component as a basis, however.

Ensure ARIA labels are used for accordion states.

### Checkbox functionality
Clicking the checkbox, or the row itself should toggle its row's checkbox. Clicking the accordion button should only expand or collapse the nested row.

#### Parent row
- When the parent row's checkbox is unchecked, then clicked, it should select all species in the family.
- When the parent row's checkbox is indeterminate, then clicked, it should be checked then select all species in the family.
- When the parent row's checkbox is checked, then clicked, it should unselect all species in the family.

#### Child rows
If the parent row is unchecked, no species should be checked. In this case:
- When the child row is checked it should change the parent row to indeterminate, and select the species.

If the parent row is indeterminate, some, but not all species should be checked. In this case:
- If checking a child row results in all species under the family being selected, it should change the parent row to checked.
- If checking a child row results in no species under the family being selected, it should change the parent row to unselected.

If the parent row is checked, all species should be checked. In this case:
- When a child row is unchecked, it should change the parent row to indeterminate.

### Concatenation
Similar to the implementation in CurrentSelectionCard.tsx, use concatenation and a tooltip if the family or species name is too long.

## Scroll functionality
When scrolling through the table, the header row should be sticky.

When filters are applied, scroll position should be maintained.

## State management
Use local state within the dialog component that integrates with the existing ArboretumProvider pattern.