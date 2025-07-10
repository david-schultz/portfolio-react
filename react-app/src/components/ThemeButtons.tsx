'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-context'

export function ThemeButtons() {
  const { theme, setTheme, isLoaded } = useTheme();

  // Don't render buttons until theme is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="flex gap-2">
        <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => setTheme('forest')}
        variant={theme === 'forest' ? 'primary' : 'secondary'}
        size="sm"
      >
        Forest
      </Button>
      <Button 
        onClick={() => setTheme('opalite')}
        variant={theme === 'opalite' ? 'primary' : 'secondary'}
        size="sm"
      >
        Opalite
      </Button>
    </div>
  );
}
