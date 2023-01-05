import { useRouter } from 'next/router'

import { Grid, Typography } from '@mui/material'

import { ProblemCard } from '../../components/problems/ProblemCard'
import { useProblem } from '../../hooks/useProblem'
import { useSource } from '../../hooks/useSource'

export default function Paper() {
  const router = useRouter()
  const { id } = router.query
  const { source, problems } = useSource(id?.toString())

  return (
    <Grid container direction="column" alignContent="center">
      <Grid item>
        sourceId: {source.id}, datePublished: {source.paper.datePublished.toDateString()}
      </Grid>
      <Grid container direction="column" spacing={2}>
        {problems &&
          problems.map((problem: any, idx: number) => {
            return (
              <Grid item alignSelf="center" key={idx}>
                <ProblemCard problem={problem} />
              </Grid>
            )
          })}
      </Grid>
    </Grid>
  )
}
