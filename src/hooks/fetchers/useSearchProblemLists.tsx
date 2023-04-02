import qs from 'qs'
import useSWR from 'swr'

import { ProblemList, ProblemListType } from '../../types/dto'

interface ProblemListsResponse {
  docs: ProblemList[]
}

interface SearchProblemListsOptions {
  type?: ProblemListType
}

interface SearchProblemListsQueryParams {
  where: {
    type?: {
      equals: ProblemListType
    }
  }
}

export function useSearchProblemLists(options?: SearchProblemListsOptions) {
  const query: SearchProblemListsQueryParams = {
    where: {},
  }
  if (options?.type) {
    query.where = {
      type: {
        equals: options.type,
      },
    }
  }
  const queryString = qs.stringify(query)
  console.log(queryString)
  const { data, error } = useSWR<ProblemListsResponse>([`/problem-lists?${queryString}`])
  return {
    problemLists: data?.docs,
    isLoading: !data && !error,
    error: error,
  }
}

// postsmint
