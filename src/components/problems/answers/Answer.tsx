import { Grid } from '@mui/material'

import { ProblemType } from '../../../types/dto'
import { Choices } from './Choices'

interface AnswerProps {
  type: ProblemType
  choices: { id?: string; choice?: string }[]
}
export function Answer({ type, choices }: AnswerProps) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item alignSelf="center" xs={10}>
        {type == 'MCQ' ? <Choices choiceList={choices} /> : null}
      </Grid>
    </Grid>
  )
}
