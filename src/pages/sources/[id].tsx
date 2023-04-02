import { useRouter } from 'next/router'

import { Grid, Paper, Typography } from '@mui/material'

import { ProblemCardList } from '../../components/card-lists/ProblemCardList'
import { useSource } from '../../hooks/useSource'

export default function Source() {
  const router = useRouter()
  const { id } = router.query
  const { source } = useSource(id.toString())

  return (
    <>
      {source && (
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
              {source.paper.datePublished && (
                <Typography variant="caption">
                  Examination Date: {new Date(source.paper.datePublished).toDateString()}
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item>{source.problems && <ProblemCardList problems={source.problems} />}</Grid>
        </Grid>
      )}
    </>
  )
}
