import axios from 'axios'
import { env } from '~/env.mjs'

export const httpClient = axios.create({
  withCredentials: true,
  baseURL: `${env.NEXT_PUBLIC_BACKEND_URL}/api`,
})

export async function swrFetcher(path: string, params?: unknown) {
  const response = await httpClient.get(path, { params })
  return response.data
}
