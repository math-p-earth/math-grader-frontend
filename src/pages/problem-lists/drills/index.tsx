import { Divider, Grid, Typography } from '@mui/material'

import { ProblemListCardList } from '../../../components/card-lists/ProblemListCardList'
import { useProblemLists } from '../../../hooks/useProblemLists'

export default function ProblemList() {
  const { problemLists } = useProblemLists('DRILL')

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Drills
        </Typography>
      </Grid>
      <Divider />
      <Grid item>{problemLists && <ProblemListCardList problemLists={problemLists} />}</Grid>
    </Grid>
  )
}
