import { CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { ProblemListCardList } from '../../../components/card-lists/ProblemListCardList'
import { useSearchProblemLists } from '../../../hooks/fetchers/useSearchProblemLists'

export default function ProblemList() {
  const { problemLists, isLoading } = useSearchProblemLists({
    type: 'DRILL',
  })

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Drills
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
