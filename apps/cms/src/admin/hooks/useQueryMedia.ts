import { useConfig } from 'payload/components/utilities'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'

import { useQuery } from '@tanstack/react-query'
import { Media } from 'core/payload-types'

import { Media as MediaConfig } from '../../collections/Media'

export interface useQueryMediaOptions {
	media: string | Media
}

export const useQueryMedia = ({ media }: useQueryMediaOptions) => {
	const {
		serverURL,
		routes: { api },
	} = useConfig()

	const query = useQuery<Media, ErrorResponse>({
		queryKey: ['media', media, serverURL, api],
		keepPreviousData: true,
		queryFn: async () => {
			// if media is not string, treat as Media, no need to query
			if (typeof media !== 'string') {
				return media
			}
			// if image is string, treat as id
			const response = await fetch(`${serverURL}${api}/${MediaConfig.slug}/${media}`, {
				credentials: 'include',
			})
			if (!response.ok) {
				throw new Error(`Failed to fetch media: ${response.text()}`)
			}

			return (await response.json()) as Media
		},
	})

	return { query }
}
