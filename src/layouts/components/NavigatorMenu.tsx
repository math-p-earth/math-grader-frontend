import Link from 'next/link'

import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from '@mui/material'

import { Profile } from './Profile'

interface MenuListInterface {
  icon: JSX.Element
  label: string
  link: string
}

const menuListArr = [
  [
    {
      icon: <HomeIcon />,
      label: 'Home',
      link: '/',
    },
    {
      icon: <MenuBookIcon />,
      label: 'Lecture Problems',
      link: {
        pathname: '/problem-lists',
        query: { type: 'LECTURE_PROBLEM' },
      },
    },
    {
      icon: <DescriptionIcon />,
      label: 'Past Papers',
      link: {
        pathname: '/sources',
        query: { type: 'PAPER' },
      },
    },
  ],
] as MenuListInterface[][]

function MenuList() {
  return (
    <List dense>
      {menuListArr.map((menuList, index) => (
        <div key={index}>
          {index > 0 && <Divider variant="middle" sx={{ pt: '6px', pb: '6px' }} />}
          {menuList.map((item) => (
            <Link href={item.link} key={item.label}>
              <ListItem key={item.label}>
                <ListItemButton
                  component={Paper}
                  style={{
                    borderRadius: '5px',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </div>
      ))}
    </List>
  )
}

export function NavigatorMenu({ menuWidth, open }: { menuWidth: number; open: boolean }) {
  const theme = useTheme()
  return (
    <Drawer
      variant="persistent"
      sx={{
        width: menuWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: menuWidth,
          boxSizing: 'border-box',
        },
      }}
      anchor="left"
      open={open}
    >
      <Paper elevation={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          padding={theme.spacing(0, 1)}
          sx={{
            ...theme.mixins.toolbar,
            backgroundColor: theme.palette.primary.main,
          }}
        />
      </Paper>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{
          height: '100%',
        }}
      >
        <Grid item>
          <MenuList />
        </Grid>
        <Grid item>
          <Profile />
        </Grid>
      </Grid>
    </Drawer>
  )
}
