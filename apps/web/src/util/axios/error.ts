import axios, { AxiosError, AxiosResponse } from 'axios'

/**
 * Normally `AxiosResponse` has both optional `request` and `response`.
 * In this data type we ensure `response` is readable. (e.g. error is from server not your network error)
 */
export interface ErrorWithAxiosResponse<T = unknown> extends AxiosError<T> {
	// Make response defined since we checked already
	response: AxiosResponse<T>
}

/**
 * Check if it is an error that came from server (400, 401, 404, 500). You can check `status` inside.
 * Input error is not type safe.
 * @remark
 * This should be able to `catch` all error due to `try` the `axiosInstance.post` except network error
 * which it cannot even reach the server in the first place. (Use `errorIsNetworkError` for that)
 *
 * @param T The innermost `data` is of type `any` if not specified here.
 */
export function errorIsFromServer<T = unknown>(error: unknown): error is ErrorWithAxiosResponse<T> {
	// Error !== null hotfixes Axios type guard that cause runtime error when null
	if (error !== null && axios.isAxiosError(error)) {
		if (error.response !== undefined) {
			return true
		}
		return false
	}
	return false
}

export interface NetworkErrorResponse extends Omit<AxiosError, 'response'> {
	request: unknown
}

/**
 * Use this method to catch error due to no internet connection.
 * It has defined `request`, but undefined `response`.
 * Input error is not type safe.
 */
export function errorIsNetworkError(error: unknown): error is NetworkErrorResponse {
	// Error !== null hotfixes Axios type guard that cause runtime error when null
	return error !== null && axios.isAxiosError(error) && error.request !== undefined && error.response === undefined
}

export type ErrorResponseCodes = 400 | 401 | 404 | 500

/**
 * When our Go server returns 401, the data contains a string "Unauthorized".
 * Input error is not type safe.
 */
export function errorIsStatus<T = unknown>(
	error: unknown,
	status: ErrorResponseCodes,
): error is ErrorWithAxiosResponse<T> {
	if (errorIsFromServer(error)) {
		if (error.response.status === status) {
			return true
		}
	}
	return false
}
