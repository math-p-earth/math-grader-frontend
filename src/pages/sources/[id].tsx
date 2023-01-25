import { useRouter } from 'next/router'

import { Grid, Paper, Typography } from '@mui/material'

import { ProblemCard } from '../../components/problems/ProblemCard'
import { useSource } from '../../hooks/useSource'
import { ProblemDto } from '../../types/dto'

export default function Source() {
  const router = useRouter()
  const { id } = router.query
  const { source, problems } = useSource(id?.toString())

  return (
    <Grid container direction="column" alignContent="center" spacing={2}>
      <Grid item>
        <Paper
          sx={{
            p: '15px',
          }}
          elevation={3}
        >
          <Typography variant="caption">ID: {source.id}</Typography>
          <Typography variant="h3">{source.name}</Typography>
          <Typography variant="caption">
            Examination Date: {source.paper.datePublished.toDateString()}
          </Typography>
        </Paper>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        {problems &&
          problems.map((problem: ProblemDto, idx: number) => {
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
