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

import { useTag } from '../../hooks/useTag'

export function PastPaperCard() {
  const { data, isLoading, error, setTagId } = useTag()

  const boxSize = '350px'

  // Write isLoading and error cases

  if (isLoading) {
    return (
      <Paper
        style={{
          width: boxSize,
          height: boxSize,
          padding: '10px',
          borderRadius: '10px',
        }}
        elevation={3}
      >
        <Skeleton variant="rounded" width={330} height={330} />
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper
        style={{
          width: boxSize,
          height: boxSize,
          padding: '10px',
          borderRadius: '10px',
        }}
        elevation={3}
      >
        <Typography variant="h6">Unable to load content.</Typography>
      </Paper>
    )
  }

  return (
    <Paper
      style={{
        width: boxSize,
        height: boxSize,
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
                {data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Chip size="small" label="Paper" />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item xs={4} alignItems="center" display="flex">
          <Grid container direction="row" height="100%">
            <Grid item xs={4}>
              <Typography variant="h4">{data.problemList.length}</Typography>
              <Typography variant="body1">Problems</Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mr: '-1px' }} />
            <Grid item xs={4}>
              <Typography variant="h4">-</Typography>
              <Typography variant="body1">Total score</Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mr: '-1px' }} />
            <Grid item xs={4}>
              <Typography variant="h4">{data.timeLimit}</Typography>
              <Typography variant="body1">mins</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item alignSelf="center" width={1}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body1">Source</Typography>
              <Typography variant="body1">PAT 1</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Exam Date</Typography>
              <Typography variant="body1">{data.datePublished?.toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Difficulty</Typography>
              <Rating
                size="small"
                value={3}
                style={{
                  padding: '0px',
                  margin: '0px',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item p={1}>
          <Typography
            variant="body2"
            textAlign="left"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '4',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {data.description}
          </Typography>
        </Grid>
        <Grid
          item
          p={1}
          sx={{
            justifySelf: 'end',
          }}
        >
          <Grid container direction="row" spacing={1} sx={{ alignSelf: 'end' }}>
            <Grid item>
              <Chip size="small" label="Important" />
            </Grid>
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
                  setTagId(2)
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
