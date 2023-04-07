import { useRouter } from 'next/router'

import { CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { SourceCardList } from '../../components/card-lists/SourceCardList'
import { useSearchSources } from '../../hooks/fetchers/useSearchSources'
import { SourceType } from '../../types/payload-types'

interface SourcesQuery {
  type: SourceType
}

const sourceTypeTitle: Record<SourceType, string> = {
  PAPER: 'Past Papers',
  BOOK: 'Books',
  GENERIC: 'Generic Sources',
}

export default function Sources() {
  const router = useRouter()
  const { type } = router.query as unknown as SourcesQuery
  const { sources, isLoading } = useSearchSources({
    type,
  })
  const title = type ? sourceTypeTitle[type] : 'Sources'

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          {title}
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
