import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material'

import { SWRConfig } from 'swr'

import { theme } from '../configs/theme'
import { Dashboard } from '../layouts/Dashboard'
import '../styles/globals.css'
import { swrFetcher } from '../util/httpClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher: swrFetcher }}>
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      </SWRConfig>
    </ThemeProvider>
  )
}
