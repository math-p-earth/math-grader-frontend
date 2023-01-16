import PrintIcon from '@mui/icons-material/Print'
import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Skeleton,
  Typography,
} from '@mui/material'

import { theme } from '../../configs/theme'
import { ProblemListDto, ProblemListType } from '../../types/dto'

export function ProblemListCard({ problemList }: { problemList: ProblemListDto }) {
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
        <Grid item p={1} direction="row" xs={3}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" textAlign="left">
                {problemList.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item xs={4} alignItems="center" display="flex">
          <Grid container direction="row" height="100%">
            <Grid item xs={4} padding={1}>
              <Typography variant="h4" textAlign="center">
                {problemList.length}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Problems
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mr: '-1px' }} />
            <Grid item xs={8} padding={1}>
              <Typography variant="body1" textAlign="left">
                {problemList.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          p={1}
          sx={{
            justifySelf: 'end',
          }}
        >
          <Grid container direction="row" spacing={1} sx={{ alignSelf: 'end' }}>
            <Grid item>{ProblemListChip(problemList.type)}</Grid>
            <Grid item xs />
            <Grid item>
              <IconButton>
                <PrintIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  console.log('Clicked')
                }}
              >
                See more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export function ProblemListChip(type: ProblemListType) {
  const LectureProblemChip = (
    <Chip
      size="small"
      label="Lecture Problem"
      sx={{
        bgcolor: theme.colorcode.green,
        color: 'black',
      }}
    />
  )

  const DrillChip = (
    <Chip
      size="small"
      label="Drill"
      sx={{
        bgcolor: theme.colorcode.yellow,
        color: 'black',
      }}
    />
  )

  const CollectionChip = (
    <Chip
      size="small"
      label="Drill"
      sx={{
        bgcolor: theme.colorcode.blue,
        color: 'black',
      }}
    />
  )

  const ChallengeChip = (
    <Chip
      size="small"
      label="Drill"
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
