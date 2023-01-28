import useSWR from 'swr'

import { ProblemList, ProblemListType } from '../types/dto'

// TODO: for the love of god, please rename this
export function useProblemLists(type?: ProblemListType) {
  const { data, error } = useSWR([
    type ? '/problem-lists?where[type][equals]=' + type : '/problem-lists',
  ])
  return {
    problemListList: data?.docs as ProblemList[],
    isLoading: !data && !error,
    error: error,
  }
}

// postsmint
