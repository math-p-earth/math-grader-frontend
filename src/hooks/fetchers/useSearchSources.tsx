import qs from 'qs'
import useSWR from 'swr'

import { Source, SourceType } from '../../types/payload-types'

interface SearchSourcesOptions {
  type?: SourceType
}

interface SearchSourcesQueryParams {
  where: {
    type?: {
      equals: SourceType
    }
  }
}

interface SearchSourcesResponse {
  docs: Source[]
}

export function useSearchSources(options?: SearchSourcesOptions) {
  const query: SearchSourcesQueryParams = {
    where: {},
  }
  if (options?.type) {
    query.where = {
      type: {
        equals: options.type,
      },
    }
  }
  const { data, error } = useSWR<SearchSourcesResponse>([`/sources?${qs.stringify(query)}`])

  return {
    sources: data?.docs,
    isLoading: !data && !error,
    error: error,
  }
}
