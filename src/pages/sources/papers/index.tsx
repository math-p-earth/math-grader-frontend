import { Divider, Grid, Typography } from '@mui/material'

import { SourceCard } from '../../../components/cards/SourceCard'
import { useSourceList } from '../../../hooks/useSourceList'
import { SourceDto } from '../../../types/dto'

export default function Source() {
  const { sources } = useSourceList()

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
          sources.map((source: SourceDto, idx: number) => {
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
