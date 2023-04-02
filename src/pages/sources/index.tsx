import { useRouter } from 'next/router'

import { CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { SourceCardList } from '../../components/card-lists/SourceCardList'
import { useSearchSources } from '../../hooks/fetchers/useSearchSources'
import { SourceType } from '../../types/dto'

interface SourcesQuery {
  type: SourceType
}

export default function Sources() {
  const router = useRouter()
  const { type } = router.query as unknown as SourcesQuery
  const { sources, isLoading } = useSearchSources({
    type,
  })

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
