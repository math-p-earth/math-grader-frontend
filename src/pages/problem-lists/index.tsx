import { Divider, Grid, Typography } from '@mui/material'

import { ProblemListCardList } from '../../components/card-lists/ProblemListCardList'
import { useProblemListList } from '../../hooks/useProblemListList'

export default function ProblemList() {
  const { problemListList } = useProblemListList()

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Problem Lists
        </Typography>
      </Grid>
      <Divider />
      <Grid item>{problemListList && <ProblemListCardList problemLists={problemListList} />}</Grid>
    </Grid>
  )
}
