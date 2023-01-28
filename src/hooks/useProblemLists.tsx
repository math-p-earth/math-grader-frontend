import useSWR from 'swr'

import { ProblemList, ProblemListType } from '../types/dto'

interface ProblemListsResponse {
  docs: ProblemList[]
}

export function useProblemLists(type?: ProblemListType) {
  const { data, error } = useSWR<ProblemListsResponse>([
    type ? '/problem-lists?where[type][equals]=' + type : '/problem-lists',
  ])
  return {
    problemLists: data?.docs,
    isLoading: !data && !error,
    error: error,
  }
}

// postsmint
