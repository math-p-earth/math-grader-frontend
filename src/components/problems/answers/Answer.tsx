import { useState } from 'react'

import { Button, Divider, Grid } from '@mui/material'

import { ProblemType } from '../../../types/dto'
import { SubmissionStatus } from '../../../types/state'
import { httpClient } from '../../../util/httpClient'
import { Choices } from './Choices'
import { ShortAnswer } from './ShortAnswer'

interface AnswerProps {
  type: ProblemType
  choices: { id?: string; choice?: string }[]
  id: string
}
export function Answer({ type, choices, id }: AnswerProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    problemId: id,
    userId: 0,
    currentAnswer: '',
    correctAnswer: '',
    wrongAnswer: [],
    status: 'NOATTEMPT',
  })

  const onClear = () => {
    setSubmissionStatus((prev) => ({ ...prev, currentAnswer: '' }))
  }

  const onSubmit = async () => {
    if (submissionStatus.wrongAnswer.includes(submissionStatus.currentAnswer)) {
      setSubmissionStatus((prev) => ({ ...prev, currentAnswer: '' }))
      return
    }

    const { data: newSubmissionStatus } = await httpClient.post<SubmissionStatus>('/submission', {
      ...submissionStatus,
    })

    setSubmissionStatus(newSubmissionStatus)
  }

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item alignSelf="center" xs={8}>
        {type == 'MCQ' ? (
          <Choices choiceList={choices} />
        ) : type == 'SHORT' ? (
          <ShortAnswer
            submissionStatus={submissionStatus}
            setSubmissionStatus={setSubmissionStatus}
          />
        ) : null}
      </Grid>
      <Grid item xs={1}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={3} container direction="column" justifyContent="end" spacing={1}>
        <Grid item>
          <Button onClick={onClear}>Clear</Button>
        </Grid>
        <Grid item>
          <Button onClick={onSubmit} variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
