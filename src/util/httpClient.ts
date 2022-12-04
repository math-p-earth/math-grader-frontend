import axios from 'axios'

export const httpClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export async function swrFetcher(path: string, params?: unknown) {
  const response = await httpClient.get(path, { params })
  return response.data
}
