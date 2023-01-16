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

import { SourceDto } from '../../types/dto'

export function SourceCard({ source }: { source: SourceDto }) {
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
                {source.name}
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
              <Typography variant="h4" textAlign="center">
                {source.length}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Problems
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mr: '-1px' }} />
            <Grid item xs={4}>
              <Typography variant="h4" textAlign="center">
                -
              </Typography>
              <Typography variant="body1" textAlign="center">
                Total score
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mr: '-1px' }} />
            <Grid item xs={4}>
              <Typography variant="h4" textAlign="center">
                {source.paper.timeLimit}
              </Typography>
              <Typography variant="body1" textAlign="center">
                mins
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
            <Grid item></Grid>
            <Grid item xs />
            <Grid item>
              <IconButton>
                <PrintIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" href={'/sources/' + source.id}>
                See more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
