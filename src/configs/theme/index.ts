declare module '@mui/material/styles' {
  interface Theme {
    colorcode: {
      red: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colorcode?: {
      red?: string;
    };
  }
}

import { PaletteOptions, colors, createTheme } from '@mui/material'

export const palette: PaletteOptions = {
  primary: {
    main: colors.lightBlue[300],
  },
  secondary: {
    main: colors.orange[500],
  },
  background: {
    default: colors.grey[400]
  },
  mode: 'dark',
}

export const theme = createTheme({
  palette: palette,
  colorcode: {
    red: '#FF6B6B'
  }
})


// 
// #FFD93D
// #6BCB77
// #4D96FF