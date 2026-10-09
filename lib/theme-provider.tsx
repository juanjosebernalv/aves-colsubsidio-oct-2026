'use client'

import { useEffect } from 'react'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Force dark mode
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }
  }, [])

  return <>{children}</>
}
