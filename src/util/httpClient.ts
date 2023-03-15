import axios from 'axios'

import { BACKEND_URL } from '../env'

export const httpClient = axios.create({
  withCredentials: true,
  baseURL: `${BACKEND_URL}/api`,
})

export async function swrFetcher(path: string, params?: unknown) {
  const response = await httpClient.get(path, { params })
  return response.data
}
