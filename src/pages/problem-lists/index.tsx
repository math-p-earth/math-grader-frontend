import { useRouter } from 'next/router'

import { CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { ProblemListCardList } from '../../components/card-lists/ProblemListCardList'
import { useSearchProblemLists } from '../../hooks/fetchers/useSearchProblemLists'
import { ProblemListType } from '../../types/dto'

interface ProblemListsQuery {
  type: ProblemListType
}

export default function ProblemLists() {
  const router = useRouter()
  const { type } = router.query as unknown as ProblemListsQuery
  const { problemLists, isLoading } = useSearchProblemLists({
    type,
  })

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Problem Lists
        </Typography>
      </Grid>
      <Divider />
      {isLoading && <CircularProgress />}
      {problemLists && (
        <Grid item>
          <ProblemListCardList problemLists={problemLists} />
        </Grid>
      )}
    </Grid>
  )
}
