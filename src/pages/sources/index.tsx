import { CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { SourceCardList } from '../../components/card-lists/SourceCardList'
import { useSearchSources } from '../../hooks/fetchers/useSearchSources'

export default function Source() {
  const { sources, isLoading } = useSearchSources()

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Sources
        </Typography>
      </Grid>
      <Divider />
      {isLoading && <CircularProgress />}
      {sources && (
        <Grid item>
          <SourceCardList sources={sources} />
        </Grid>
      )}
    </Grid>
  )
}
