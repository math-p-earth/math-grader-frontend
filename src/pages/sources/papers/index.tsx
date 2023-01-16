import { Divider, Grid, Typography } from '@mui/material'

import { SourceCard } from '../../../components/cards/SourceCard'
import { useSourceList } from '../../../hooks/useSourceList'

export default function Source(props: any) {
  const { sources, error } = useSourceList('PAPER')

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h2" color="white">
          Past Papers
        </Typography>
      </Grid>
      <Divider />
      <Grid item container direction="row" spacing={2}>
        {sources &&
          sources.map((source: any, idx: number) => {
            return (
              <Grid item alignSelf="center" key={idx}>
                <SourceCard source={source} />
              </Grid>
            )
          })}
      </Grid>
    </Grid>
  )
}
