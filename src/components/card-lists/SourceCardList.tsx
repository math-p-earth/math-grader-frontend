import { Grid } from '@mui/material'

import { Source } from '../../types/dto'
import { SourceCard } from '../cards/SourceCard'

interface SourceCardListProps {
  sources: Source[] | undefined
}

export function SourceCardList({ sources }: SourceCardListProps) {
  return (
    <Grid container direction="row" spacing={2}>
      {sources &&
        sources.map((source: Source, idx: number) => {
          return (
            <Grid item alignSelf="center" key={idx}>
              <SourceCard source={source} />
            </Grid>
          )
        })}
    </Grid>
  )
}
