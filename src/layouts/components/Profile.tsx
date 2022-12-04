import { Avatar, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'

const userData = {
  name: 'Suphon Thanakornpakapong',
  imgSrc:
    'https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/279895521_5225015280926824_8846141764387356928_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeEE-y1TYPa3z9jYZRpJhiIHCNmQ_45gIToI2ZD_jmAhOinGr3ZpgThJj3_mGfWNuYAsW1rAK8Yt7QguQJBnSaxb&_nc_ohc=ctJJiORPl9cAX-FZTbs&_nc_ht=scontent.fbkk2-7.fna&oh=00_AT-QoAhR4RG7V-2DNyQZAQWovhVexrTBnRHXxTCYGphC9g&oe=634FF960',
  assignProg: 30,
  entProg: 40,
}

export function Profile() {
  return (
    <div style={{ padding: '10px', margin: '10px' }}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Avatar sx={{ width: '80px', height: '80px' }} src={userData.imgSrc} />
        </Grid>
        <Grid item>
          <Typography variant="body2" fontWeight="bold">
            {userData.name}
          </Typography>
        </Grid>
        <Grid item>
          <Button size="small">Edit Profile</Button>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Paper
            sx={{
              p: '8px',
            }}
          >
            <Typography variant="body2" textAlign="left">
              Current Task: Do HW
            </Typography>
          </Paper>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Paper
            sx={{
              p: '8px',
            }}
          >
            <Typography variant="body2" textAlign="left">
              Assignment Done
            </Typography>
            <LinearProgress variant="determinate" color="secondary" value={userData.assignProg} />
            <Typography variant="body2" textAlign="left">
              Entrance Problem Done
            </Typography>
            <LinearProgress variant="determinate" color="secondary" value={userData.entProg} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
