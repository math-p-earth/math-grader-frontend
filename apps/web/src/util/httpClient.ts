import axios from 'axios'

export const httpClient = axios.create({
	withCredentials: true,
	baseURL: `/api`, // send requests to api proxy
})
