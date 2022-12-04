import React from 'react'

import useSWR from 'swr'

import { tagFetchResponse } from '../util/fetchUtil'

export function useTag() {
  const [tagId, setTagId] = React.useState<number>(1)

  const { data, error } = useSWR(['/tag/' + tagId.toString()])

  return {
    setTagId: setTagId,
    data: tagFetchResponse(data),
    isLoading: !data && !error,
    error: error,
  }
}
