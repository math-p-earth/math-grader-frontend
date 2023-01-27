import { Divider, Grid, Typography } from '@mui/material'

import { SourceCardList } from '../../../components/card-lists/SourceCardList'
import { useSourceList } from '../../../hooks/useSourceList'

export default function Source() {
  const { sources } = useSourceList()

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Past Papers
        </Typography>
      </Grid>
      <Divider />
      <Grid item>
        <SourceCardList sources={sources} />
      </Grid>
    </Grid>
  )
}
