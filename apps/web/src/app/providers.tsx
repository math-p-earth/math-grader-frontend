'use client'

import { useState } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { env } from '~/env.mjs'

interface ProvidersProps {
	children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>
			<QueryClientProvider client={queryClient}>
				<NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</NextThemesProvider>
			</QueryClientProvider>
		</GoogleOAuthProvider>
	)
}
