import useSWR from 'swr'

import { ProblemListType } from '../types/dto'
import { problemFetchResponse, problemListFetchResponse } from '../util/fetchUtil'

export function useProblemList(id: string | undefined) {
  const { data, error } = useSWR(['/problem-lists/' + id])

  console.log(data)

  return {
    problemList: problemListFetchResponse(data),
    problems: data?.problems.map((p: any, index: number) =>
      problemFetchResponse({ ...p, order: index + 1 })
    ),
    isLoading: !data && !error,
    error: error,
  }
}
