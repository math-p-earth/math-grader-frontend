import { Grid } from '@mui/material'

import { Problem } from '../../types/dto'
import { ProblemCard, ProblemCardVariant } from '../problems/ProblemCard'

interface ProblemCardListProps {
  problems: Problem[] | string[] | undefined
  variant?: ProblemCardVariant
}

export function ProblemCardList({ problems, variant = 'DEFAULT' }: ProblemCardListProps) {
  return (
    <Grid container direction="column" spacing={2}>
      {problems &&
        problems.map((problem: Problem | string, idx: number) => {
          return (
            <Grid item alignSelf="center" key={idx}>
              <ProblemCard problem={problem} variant={variant} />
            </Grid>
          )
        })}
    </Grid>
  )
}
