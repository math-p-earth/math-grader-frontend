import { Grid } from '@mui/material'

import { ProblemListCard } from '../../../components/cards/ProblemListCard'
import { useProblemListList } from '../../../hooks/useProblemListList'

export default function ProblemList(props: any) {
  const { problemListList } = useProblemListList('DRILL')

  return (
    <Grid container direction="column" alignContent="center">
      <Grid item>Problem List</Grid>
      <Grid item container direction="column" spacing={2}>
        {problemListList &&
          problemListList.map((problemList: any, idx: number) => {
            return (
              <Grid item alignSelf="center" key={idx}>
                <ProblemListCard problemList={problemList} />
              </Grid>
            )
          })}
      </Grid>
    </Grid>
  )
}
