import { Grid } from '@mui/material'

import { SourceCard } from '../../../components/cards/SourceCard'
import { useSourceList } from '../../../hooks/useSourceList'

export default function Source(props: any) {
  const { sources, error } = useSourceList('PAPER')

  return (
    <Grid container direction="column" alignContent="center">
      <Grid container direction="column" spacing={2}>
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
