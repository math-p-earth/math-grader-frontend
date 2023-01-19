import useSWR from 'swr'

import { problemFetchResponse, problemListFetchResponse } from '../util/fetchUtil'

export function useProblemList(id: string | undefined) {
  const { data, error } = useSWR(['/problem-lists/' + id])

  return {
    problemList: problemListFetchResponse(data),
    problems: data?.problems.map((p: any, index: number) =>
      problemFetchResponse({ ...p, order: index + 1 })
    ),
    isLoading: !data && !error,
    error: error,
  }
}
