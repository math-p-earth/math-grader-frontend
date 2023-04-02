import { Grid } from '@mui/material'

import { Problem } from '../../types/dto'
import { ProblemCard, ProblemCardVariant } from '../problems/ProblemCard'

interface ProblemCardListProps {
  problems: Problem[]
  variant?: ProblemCardVariant
}

export function ProblemCardList({ problems, variant = 'DEFAULT' }: ProblemCardListProps) {
  return (
    <Grid container direction="column" spacing={2}>
      {problems.map((problem: Problem, index: number) => {
        return (
          <Grid item alignSelf="center" key={index + 1}>
            <ProblemCard problem={problem} order={index + 1} variant={variant} />
          </Grid>
        )
      })}
    </Grid>
  )
}
