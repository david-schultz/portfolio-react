The <CurrentSelectionCard> is used to display information about the currently selected grid-cell.

Inside this component, there is a table element. The table should be used to list each species, their family, and the number of accessions in the current selection.

The table should be automatically ordered by count. There should be no functionality that lets the user change this ordering. There should be no indicators/icons that inform the user how its sorted.

The table should also be paginated. There should be max five rows visible.

The table should not be wider than its parent the card. The way this should be achieved is as follows:
- Strings in the family/species columns should be concatenated when they get too wide.
- If the string gets concatenated, it should have a tooltip that contains the full name.

Please implement this table using the functionality from "@tanstack/react-table".