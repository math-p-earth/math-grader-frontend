import React from 'react'

import { Box, styled, useTheme } from '@mui/material'

import { ApplicationBar } from './components/ApplicationBar'
import { NavigatorMenu } from './components/NavigatorMenu'

const menuWidth = 250

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${menuWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

export function Dashboard({ children }: { children: JSX.Element }) {
  const theme = useTheme()
  const [open, setOpen] = React.useState<boolean>(true)

  return (
    <Box sx={{ display: 'flex', height: 'inherit' }}>
      <ApplicationBar menuWidth={menuWidth} open={open} setOpen={setOpen} />
      <NavigatorMenu menuWidth={menuWidth} open={open} />
      <Main
        open={open}
        sx={{
          bgcolor: 'black',
          height: '100%',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          padding={theme.spacing(0, 1)}
          sx={{ ...theme.mixins.toolbar }}
        />
        {children}
      </Main>
    </Box>
  )
}
