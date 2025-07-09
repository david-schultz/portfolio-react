// Utility functions for arboretum data processing and calculations
import { Cell, ComputeConfig } from './ArboretumProvider';

// Get the value for a cell based on the current compute configuration
export const getCellValue = (cell: Cell, computeConfig: ComputeConfig): number => {
  switch (computeConfig.metric) {
    case 'ALL':
      return cell.accessions;
    case 'FAMILY':
      return cell.families;
    case 'SPECIES':
      return cell.species;
    case 'Z-SCORE':
      return (cell.zscoreA + cell.zscoreF + cell.zscoreS) / 3;
    case 'Z-SCORE-UNIQUE':
      return (cell.zscoreF + cell.zscoreS) / 2;
    case 'DIVERSITY':
      return cell.diversity;
    case 'PERCENTAGE':
      return cell.percentage;
    default:
      return cell.accessions;
  }
};

// Get color for a cell based on its value and the current metric
export const getCellColor = (cell: Cell, computeConfig: ComputeConfig, minValue?: number, maxValue?: number): string => {
  const value = getCellValue(cell, computeConfig);
  
  if (cell.accessions === 0) {
    return '#f5f5f5'; // Light gray for empty cells
  }
  
  // Use provided min/max values for proper normalization
  const min = minValue ?? 0;
  const max = maxValue ?? Math.max(value, 1);
  
  // Ensure we don't divide by zero
  const range = max - min;
  const normalizedValue = range > 0 ? (value - min) / range : 0;
  
  // Clamp the value between 0 and 1
  const clampedValue = Math.max(0, Math.min(1, normalizedValue));
  
  // Blue gradient from light to dark
  const lightness = 90 - (clampedValue * 60); // 90% to 30%
  const hue = 210; // Blue
  const saturation = 70;
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Format display value for UI
export const formatCellValue = (cell: Cell, computeConfig: ComputeConfig): string => {
  const value = getCellValue(cell, computeConfig);
  
  switch (computeConfig.metric) {
    case 'Z-SCORE':
    case 'Z-SCORE-UNIQUE':
    case 'DIVERSITY':
      return value.toFixed(2);
    case 'PERCENTAGE':
      return `${value.toFixed(1)}%`;
    default:
      return Math.round(value).toString();
  }
};

// Get metric display name
export const getMetricDisplayName = (metric: ComputeConfig['metric']): string => {
  switch (metric) {
    case 'ALL':
      return 'Total Accessions';
    case 'FAMILY':
      return 'Unique Families';
    case 'SPECIES':
      return 'Unique Species';
    case 'Z-SCORE':
      return 'Average Z-Score';
    case 'Z-SCORE-UNIQUE':
      return 'Uniqueness Z-Score';
    case 'DIVERSITY':
      return 'Diversity Index';
    case 'PERCENTAGE':
      return 'Percentage';
    default:
      return 'Total Accessions';
  }
};
