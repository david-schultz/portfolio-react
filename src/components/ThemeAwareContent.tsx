'use client'

import { useTheme } from '@/components/theme-context'

interface ThemeAwareContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemeAwareContent({ children, className }: ThemeAwareContentProps) {
  const { theme } = useTheme();
  
  return (
    <div className={className} data-theme={theme}>
      {children}
    </div>
  );
}
