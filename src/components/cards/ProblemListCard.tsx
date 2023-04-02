import PrintIcon from '@mui/icons-material/Print'
import { Button, Chip, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'

import { theme } from '../../configs/theme'
import { ProblemList, ProblemListType } from '../../types/dto'

interface ProblemListCardProps {
  problemList: ProblemList
}

export function ProblemListCard({ problemList }: ProblemListCardProps) {
  const boxSize = '350px'

  return (
    <Paper
      style={{
        width: boxSize,
        padding: '10px',
        borderRadius: '10px',
      }}
      elevation={3}
    >
      <Grid container direction="column">
        <Grid item p={1} xs={3}>
          <Typography variant="h5" textAlign="left">
            {problemList.name}
          </Typography>
        </Grid>
        <Divider />
        <Grid item alignItems="center" display="flex">
          <Grid container direction="row" height="100%">
            <Grid item xs={4} padding={1}>
              <Typography variant="h4" textAlign="center">
                {problemList.problems.length}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Problems
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mr: '-1px' }} />
            <Grid item xs padding={1}>
              <Typography variant="body1" textAlign="left">
                {problemList.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item p={1}>
          <Grid container direction="row" spacing={1}>
            <Grid item alignSelf="center">
              {ProblemListChip(problemList.type)}
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton>
                <PrintIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" href={'/problem-lists/' + problemList.id}>
                See more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export function ProblemListChip(type: ProblemListType | undefined) {
  const LectureProblemChip = (
    <Chip
      size="small"
      label="LECTURE"
      sx={{
        bgcolor: theme.colorcode.green,
        color: 'black',
      }}
    />
  )

  const DrillChip = (
    <Chip
      size="small"
      label="DRILL"
      sx={{
        bgcolor: theme.colorcode.yellow,
        color: 'black',
      }}
    />
  )

  const CollectionChip = (
    <Chip
      size="small"
      label="COLLECTION"
      sx={{
        bgcolor: theme.colorcode.blue,
        color: 'black',
      }}
    />
  )

  const ChallengeChip = (
    <Chip
      size="small"
      label="CHALLENGE"
      sx={{
        bgcolor: theme.colorcode.red,
        color: 'black',
      }}
    />
  )
  if (type === 'LECTURE_PROBLEM') return LectureProblemChip
  else if (type === 'DRILL') return DrillChip
  else if (type === 'COLLECTION') return CollectionChip
  else if (type === 'CHALLENGE') return ChallengeChip
}
