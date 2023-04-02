import qs from 'qs'
import useSWR from 'swr'

import { ProblemList, ProblemListType } from '../../types/payload-types'

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

interface SearchProblemListsResponse {
  docs: ProblemList[]
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
  const { data, error } = useSWR<SearchProblemListsResponse>([
    `/problem-lists?${qs.stringify(query)}`,
  ])
  return {
    problemLists: data?.docs,
    isLoading: !data && !error,
    error: error,
  }
}

// postsmint
