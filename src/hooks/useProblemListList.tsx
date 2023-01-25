import useSWR from 'swr'

import { ProblemListType } from '../types/dto'
import { ProblemListResponseInterface, problemListFetchResponse } from '../util/fetchUtil'

// TODO: for the love of god, please rename this
export function useProblemListList(type?: ProblemListType) {
  const { data, error } = useSWR([
    type ? '/problem-lists?where[type][equals]=' + type : '/problem-lists',
  ])
  return {
    problemListList: data?.docs.map((s: ProblemListResponseInterface) =>
      problemListFetchResponse(s)
    ),
    isLoading: !data && !error,
    error: error,
  }
}

// postsmint
