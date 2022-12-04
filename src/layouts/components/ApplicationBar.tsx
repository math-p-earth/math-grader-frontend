import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Toolbar, styled } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

interface AppBarProps extends MuiAppBarProps {
  menuWidth: number
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, menuWidth, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${menuWidth}px)`,
    marginLeft: `${menuWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export function ApplicationBar({
  menuWidth,
  open,
  setOpen,
}: {
  menuWidth: number
  open: boolean
  setOpen: Function
}) {
  return (
    <AppBar position="fixed" menuWidth={menuWidth} open={open}>
      <Toolbar>
        <IconButton
          onClick={() => {
            setOpen(!open)
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
