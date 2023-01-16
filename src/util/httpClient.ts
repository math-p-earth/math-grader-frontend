import axios from 'axios'

export const httpClient = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export async function swrFetcher(path: string, params?: unknown) {
  const response = await httpClient.get(path, { params })
  return response.data
}
