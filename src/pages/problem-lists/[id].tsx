import { useRouter } from 'next/router'

import { Grid, Paper, Typography } from '@mui/material'

import { ProblemCardList } from '../../components/card-lists/ProblemCardList'
import { useProblemList } from '../../hooks/useProblemList'

export default function ProblemList() {
  const router = useRouter()
  const { id } = router.query
  const { problemList } = useProblemList(id.toString())

  return (
    <>
      {problemList && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignContent="center"
          spacing={2}
        >
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
          <Grid item>
            <ProblemCardList problems={problemList.problems} />
          </Grid>
        </Grid>
      )}
    </>
  )
}
