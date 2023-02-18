import { useState } from 'react'

import { useRouter } from 'next/router'

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

const excludedRoutes = ['/login', '/user/pending-approval', '/user/register-success']

export function Dashboard({ children }: { children: JSX.Element }) {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()

  // TODO: temporary hack. Will move to layouts in app directory later
  if (excludedRoutes.includes(router.pathname)) {
    return children
  }

  return (
    <Box sx={{ display: 'flex', height: 'inherit' }}>
      <ApplicationBar menuWidth={menuWidth} open={open} setOpen={setOpen} />
      <NavigatorMenu menuWidth={menuWidth} open={open} />
      <Main
        open={open}
        sx={{
          bgcolor: '#121212',
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
