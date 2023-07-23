import Image from 'next/image'
import Link from 'next/link'

import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
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
      label: 'Problem Lists',
      link: {
        pathname: '/problem-lists',
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

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-primary p-8 dark:bg-zinc-800">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logos/app.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <span className="text-primary-foreground">Math P' Earth</span>
        </div>
      </div>
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
    </div>
  )
}
