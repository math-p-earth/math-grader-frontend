import { PaletteOptions, colors, createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Theme {
    colorcode: {
      red: string
      yellow: string
      green: string
      blue: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colorcode?: {
      red?: string
      yellow?: string
      green?: string
      blue?: string
    }
  }
}

export const palette: PaletteOptions = {
  primary: {
    main: colors.lightBlue[300],
  },
  secondary: {
    main: colors.orange[500],
  },
  background: {
    default: colors.grey[400],
  },
  mode: 'dark',
}

export const theme = createTheme({
  palette: palette,
  colorcode: {
    red: '#FF6B6B',
    yellow: '#FFD93D',
    green: '#6BCB77',
    blue: '#4D96FF',
  },
})
