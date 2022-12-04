import React from 'react'

import { Button, Divider, Grid } from '@mui/material'

import { ProblemType } from '../../../types/dto'
import { SubmissionStatus } from '../../../types/state'
import { httpClient } from '../../../util/httpClient'
import { Choices } from './Choices'
import { ShortAnswer } from './ShortAnswer'

export function Answer({
  problemType,
  answer,
  choices,
  problemId,
}: {
  problemType: ProblemType
  answer: string
  choices: string[]
  problemId: number
}) {
  const [submissionStatus, setSubmissionStatus] = React.useState<SubmissionStatus>({
    problemId: problemId,
    userId: 0,
    currentAnswer: '',
    correctAnswer: '',
    wrongAnswer: [],
    status: 'NOATTEMPT',
  })

  const onClear = () => {
    console.log(submissionStatus)
    setSubmissionStatus((prev) => ({ ...prev, currentAnswer: '' }))
  }

  const onSubmit = async () => {
    if (submissionStatus.wrongAnswer.includes(submissionStatus.currentAnswer)) {
      setSubmissionStatus((prev) => ({ ...prev, currentAnswer: '' }))
      return
    }

    const newSubmissionStatus = (
      await httpClient.post('/submission', {
        ...submissionStatus,
      })
    ).data as SubmissionStatus

    setSubmissionStatus(newSubmissionStatus)
  }

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item alignSelf="center" xs={9}>
        {(() => {
          if (problemType == 'MCQ') {
            return (
              <Choices
                choiceList={choices}
                submissionStatus={submissionStatus}
                setSubmissionStatus={setSubmissionStatus}
              />
            )
          } else if (problemType == 'SHORT') {
            return (
              <ShortAnswer
                submissionStatus={submissionStatus}
                setSubmissionStatus={setSubmissionStatus}
              />
            )
          }
        })()}
      </Grid>
      <Grid item xs={1}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={2} container direction="column" justifyContent="end" spacing={1}>
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
