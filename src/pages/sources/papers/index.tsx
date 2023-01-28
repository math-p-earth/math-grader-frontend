import { Divider, Grid, Typography } from '@mui/material'

import { SourceCardList } from '../../../components/card-lists/SourceCardList'
import { useSources } from '../../../hooks/useSources'

export default function Source() {
  const { sources } = useSources()

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
