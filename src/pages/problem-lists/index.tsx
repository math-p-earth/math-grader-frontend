import { useRouter } from 'next/router'

import { CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { ProblemListCardList } from '../../components/card-lists/ProblemListCardList'
import { useSearchProblemLists } from '../../hooks/fetchers/useSearchProblemLists'
import { ProblemListType } from '../../types/payload-types'

interface ProblemListsQuery {
  type: ProblemListType
}

const problemListTypeTitle: Record<ProblemListType, string> = {
  DRILL: 'Drills',
  LECTURE_PROBLEM: 'Lecture Problems',
  CHALLENGE: 'Challenges',
  COLLECTION: 'Collections',
}

export default function ProblemLists() {
  const router = useRouter()
  const { type } = router.query as unknown as ProblemListsQuery // TODO: use user-defined type guards to validate query
  const { problemLists, isLoading } = useSearchProblemLists({
    type,
  })
  const title = type ? problemListTypeTitle[type] : 'Problem Lists'

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          {title}
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
