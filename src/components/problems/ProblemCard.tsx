import { Avatar, Divider, Grid, Paper } from '@mui/material'

import { Problem } from '../../types/dto'
import { Markdown } from '../md/Markdown'
import { Answer } from './answers/Answer'

export type ProblemCardVariant = 'DEFAULT' | 'COMPACT' | 'VIEWONLY'

interface ProblemCardProps {
  problem: Problem | string
  order?: number
  variant?: ProblemCardVariant
}

export function ProblemCard({ problem, order, variant = 'DEFAULT' }: ProblemCardProps) {
  // in case that the datatype is 'string'
  if (typeof problem === 'string') return <>{problem}</>

  return (
    <Paper
      sx={{
        p: '10px',
        width: '900px',
      }}
      elevation={3}
    >
      <Grid container direction="column" spacing={0} padding="10px">
        <Grid item container>
          <Grid item>
            <Avatar variant="rounded">{order?.toString()}</Avatar>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Markdown content={problem.content} variant={'body1'} />
        </Grid>
        {variant === 'DEFAULT' && (
          <Grid
            item
            sx={{
              ml: '80px',
            }}
          >
            {<Answer type={problem.type} choices={problem.type == 'MCQ' ? problem.choices : []} />}
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
