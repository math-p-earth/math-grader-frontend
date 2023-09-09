import axios from 'axios'

export const httpClient = axios.create({
  withCredentials: true,
  baseURL: `/api`, // send requests to api proxy
})

export async function swrFetcher(path: string, params?: unknown) {
  const response = await httpClient.get(path, { params })
  return response.data
}
