import { Avatar, Divider, Grid, Paper } from '@mui/material'

import { ProblemDto } from '../../types/dto'
import { Markdown } from '../md/Markdown'
import { Answer } from './answers/Answer'

export type ProblemCardVariant = 'DEFAULT' | 'COMPACT' | 'VIEWONLY'

export function ProblemCard({
  problem,
  variant = 'DEFAULT',
}: {
  problem: ProblemDto
  variant?: ProblemCardVariant
}) {
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
            <Avatar variant="rounded">{problem.order}</Avatar>
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
            {
              <Answer
                id={problem.id}
                type={problem.type}
                choices={problem.type == 'MCQ' ? problem.choices : []}
              />
            }
          </Grid>
        )}
        {variant === 'COMPACT' && (
          <Grid
            item
            sx={{
              ml: '80px',
            }}
          >
            <ChoiceViewOnly choices={problem.type == 'MCQ' ? problem.choices : []} />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

function ChoiceViewOnly({ choices }: { choices: string[] }) {
  return (
    <Grid container spacing={1}>
      {choices.map((caption, index) => {
        return (
          <Grid item container key={index} spacing={1}>
            <Grid item alignSelf="center">
              <Avatar variant="rounded">{index + 1}</Avatar>
              {/* <Typography variant="h6"></Typography> */}
            </Grid>
            <Grid item alignSelf="center">
              <Paper
                elevation={1}
                sx={{
                  minWidth: '500px',
                  pt: '1px',
                  pb: '1px',
                  pl: '10px',
                  pr: '10px',
                }}
              >
                <Markdown content={caption} variant="body2" />
              </Paper>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
