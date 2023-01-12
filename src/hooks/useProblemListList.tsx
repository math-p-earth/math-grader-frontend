import useSWR from 'swr'

import { ProblemListType } from '../types/dto'
import { problemListFetchResponse } from '../util/fetchUtil'

export function useProblemListList(type?: ProblemListType) {
  const { data, error } = useSWR(['/problem-lists/'])

  console.log(data)

  return {
    problemListList: data?.docs.map((s: any) => problemListFetchResponse(s)),
    isLoading: !data && !error,
    error: error,
  }
}
