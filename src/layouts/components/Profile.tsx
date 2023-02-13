import { Button, Grid, Typography } from '@mui/material'

import { useUser } from '../../hooks/useUser'

export function Profile() {
  const { user, signOut } = useUser()

  if (!user) {
    return null
  }

  return (
    <div style={{ padding: '10px', margin: '10px' }}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="body2" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" color="error" onClick={signOut}>
            Sign out
          </Button>
        </Grid>
        {/* <Grid item>
          <Button size="small">Edit Profile</Button>
        </Grid> */}
        {/* <Grid item sx={{ width: '100%' }}>
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
        </Grid> */}
      </Grid>
    </div>
  )
}
