import useSWR from 'swr'

import {
  ProblemResponseInterface,
  problemFetchResponse,
  problemListFetchResponse,
} from '../util/fetchUtil'

export function useProblemList(id: string | undefined) {
  const { data, error } = useSWR(['/problem-lists/' + id])

  return {
    problemList: problemListFetchResponse(data),
    problems: data?.problems.map((p: ProblemResponseInterface) => problemFetchResponse(p)),
    isLoading: !data && !error,
    error: error,
  }
}
