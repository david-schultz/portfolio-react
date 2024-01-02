import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const graphik = localFont({
  src: [
    {
      path: '../fonts/Graphik/GraphikRegular.otf',
      weight: '400'
    },
    {
      path: '../fonts/Graphik/GraphikMedium.otf',
      weight: '500'
    },
    {
      path: '../fonts/Graphik/GraphikSemibold.otf',
      weight: '600'
    },
  ],
  variable: '--font-graphik'
})

export const metadata: Metadata = {
  title: 'David Schultz',
  description: 'Interaction Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={graphik.className}>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
