import { useRouter } from 'next/router'

import { Grid, Paper, Typography } from '@mui/material'

import { ProblemCard } from '../../components/problems/ProblemCard'
import { useProblemList } from '../../hooks/useProblemList'

export default function ProblemList() {
  const router = useRouter()
  const { id } = router.query
  const { problemList, problems } = useProblemList(id?.toString())

  return (
    <Grid container direction="column" justifyContent="center" alignContent="center" spacing={2}>
      <Grid item>
        <Paper
          sx={{
            p: '15px',
          }}
          elevation={3}
        >
          <Typography variant="caption">ID: {problemList.id}</Typography>
          <Typography variant="h3">{problemList.name}</Typography>
        </Paper>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        {problems &&
          problems.map((problem: any, idx: number) => {
            return (
              <Grid item alignSelf="center" key={idx}>
                <ProblemCard problem={problem} variant="COMPACT" />
              </Grid>
            )
          })}
      </Grid>
    </Grid>
  )
}
