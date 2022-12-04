import { PaletteOptions, colors, createTheme } from '@mui/material'

export const palette: PaletteOptions = {
  primary: {
    main: colors.lightBlue[300],
  },
  secondary: {
    main: colors.orange[500],
  },
}

export const theme = createTheme({
  palette: palette,
})
