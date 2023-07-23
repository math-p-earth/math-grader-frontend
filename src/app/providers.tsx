'use client'

import { useState } from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}