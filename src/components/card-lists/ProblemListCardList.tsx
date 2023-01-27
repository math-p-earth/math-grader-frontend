import { Grid } from '@mui/material'

import { ProblemList } from '../../types/dto'
import { ProblemListCard } from '../cards/ProblemListCard'

interface ProblemListCardListProps {
  problemLists: ProblemList[]
}

export function ProblemListCardList({ problemLists }: ProblemListCardListProps) {
  console.log(problemLists)
  return (
    <Grid container direction="row" spacing={2}>
      {problemLists.toString()}
      {problemLists &&
        problemLists.map((problemList: ProblemList, idx: number) => {
          return (
            <Grid item alignSelf="center" key={idx}>
              <ProblemListCard problemList={problemList} />
            </Grid>
          )
        })}
    </Grid>
  )
}
