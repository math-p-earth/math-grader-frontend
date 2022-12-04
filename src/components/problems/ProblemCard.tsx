import { Avatar, Divider, Grid, Paper } from '@mui/material'

import { ProblemDto } from '../../types/dto'
import { Markdown } from '../md/Markdown'
import { Answer } from './answers/Answer'

export type ProblemCardVariant = 'DEFAULT' | 'COMPACT' | 'VIEWONLY'

export function ProblemCard({ problem }: { problem: ProblemDto }) {
  return (
    <Paper
      sx={{
        p: '10px',
        width: '700px',
      }}
      elevation={3}
    >
      <Grid container direction="column" spacing={0} padding="10px">
        <Grid item container>
          <Grid item>
            <Avatar variant="rounded">{problem.order}</Avatar>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Markdown content={problem.content} />
        </Grid>
        <Grid
          item
          sx={{
            ml: '80px',
          }}
        >
          {
            <Answer
              problemId={problem.id}
              problemType={problem.problemType}
              answer={problem.answer}
              choices={problem.problemType == 'MCQ' ? problem.choices : []}
            />
          }
        </Grid>
      </Grid>
    </Paper>
  )
}
