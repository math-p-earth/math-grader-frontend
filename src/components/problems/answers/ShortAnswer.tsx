import React, { Dispatch, SetStateAction } from 'react'

import { TextField } from '@mui/material'

import { SubmissionStatus } from '../../../types/state'

export function ShortAnswer({
  submissionStatus,
  setSubmissionStatus,
}: {
  submissionStatus: SubmissionStatus
  setSubmissionStatus: Dispatch<SetStateAction<SubmissionStatus>>
}) {
  const [helperWrong, setHelperWrong] = React.useState<string>('')

  React.useEffect(() => {
    let str = 'You have answered the following: '
    const wrongAnswer = submissionStatus.wrongAnswer
    for (let i = 0; i < wrongAnswer.length; i++) {
      str += wrongAnswer[i]
      if (i != wrongAnswer.length - 1) {
        str += ', '
      }
    }
    setHelperWrong(str)
  }, [submissionStatus])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSubmissionStatus((prev: SubmissionStatus) => ({
      ...prev,
      currentAnswer: e.target.value,
    }))
  }

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        label="Short Answer"
        size="small"
        onChange={onChange}
        value={submissionStatus ? submissionStatus.currentAnswer : ''}
        disabled={
          submissionStatus.status == 'CORRECT' ||
          submissionStatus.status == 'COMPLETE' ||
          submissionStatus.status == 'PENDING'
        }
        error={submissionStatus.status == 'INCORRECT'}
        helperText={submissionStatus.wrongAnswer.length == 0 ? '' : helperWrong}
      />
    </div>
  )
}
