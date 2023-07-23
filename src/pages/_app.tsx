import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SWRConfig } from 'swr'

import { theme } from '../configs/theme'
import { ProtectedRoutes } from '../contexts/protectedRoutes'
import { Layout } from '../layouts/Dashboard'
import '../styles/globals.css'
import { swrFetcher } from '../util/httpClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher: swrFetcher }}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>
          <ProtectedRoutes>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoutes>
        </GoogleOAuthProvider>
      </SWRConfig>
    </ThemeProvider>
  )
}
