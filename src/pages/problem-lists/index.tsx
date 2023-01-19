import { useRouter } from 'next/router'

import { Divider, Grid, Typography } from '@mui/material'

import { ProblemListCard } from '../../components/cards/ProblemListCard'
import { useProblemListList } from '../../hooks/useProblemListList'

export default function ProblemList(props: any) {
  const { problemListList } = useProblemListList()

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Problem Lists
        </Typography>
      </Grid>
      <Divider />
      <Grid item container direction="row" spacing={2}>
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
