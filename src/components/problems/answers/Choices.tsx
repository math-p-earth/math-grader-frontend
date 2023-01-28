import React from 'react'

import { Button, Grid, Paper, Typography } from '@mui/material'

import { Markdown } from '../../md/Markdown'

const buttonSize = '40px'

interface ChoiceStyle {
  variant: 'outlined' | 'contained'
  color: 'primary' | 'success' | 'error'
  disabled: boolean
  disableRipple: boolean
}

const choiceStyle = {
  NORMAL: {
    variant: 'outlined',
    color: 'primary',
    disabled: false,
    disableRipple: false,
  } as ChoiceStyle,
  SELECTED: {
    variant: 'contained',
    color: 'primary',
    disabled: false,
    disableRipple: false,
  } as ChoiceStyle,
  DISABLED: {
    variant: 'outlined',
    color: 'primary',
    disabled: true,
    disableRipple: false,
  } as ChoiceStyle,
  CORRECT: {
    variant: 'contained',
    color: 'success',
    disabled: false,
    disableRipple: true,
  } as ChoiceStyle,
  WRONG: {
    variant: 'contained',
    color: 'error',
    disabled: false,
    disableRipple: true,
  } as ChoiceStyle,
}

interface ChoicesProps {
  choiceList: { id?: string; choice?: string }[]
}

export function Choices({ choiceList }: ChoicesProps) {
  const choiceStyleList = choiceList.map(() => choiceStyle.DISABLED)

  return (
    <Grid container spacing={1}>
      {choiceList.map((choice, idx) => {
        return (
          <Choice
            key={idx}
            idx={idx + 1}
            caption={choice.choice}
            choiceStyling={choiceStyleList[idx]}
          />
        )
      })}
    </Grid>
  )
}

interface ChoiceProps {
  idx: number
  caption?: string
  choiceStyling: ChoiceStyle
}

function Choice({ idx, caption, choiceStyling }: ChoiceProps) {
  return (
    <Grid item key={idx} container direction="row" spacing={1}>
      <Grid item alignSelf="center">
        <Button
          {...choiceStyling}
          sx={{
            p: 0,
            minWidth: buttonSize,
            height: buttonSize,
          }}
        >
          <Typography variant="h6">{idx}</Typography>
        </Button>
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
          <Markdown content={caption ? caption : ''} variant="body2" />
        </Paper>
      </Grid>
    </Grid>
  )
}
