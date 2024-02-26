import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { httpClient } from './httpClient'

const downloadFileFromBuffer = (data: ArrayBuffer, filename: string, type = 'application/pdf') => {
	if (!window) {
		throw new Error('window not found')
	}
	const blob = new Blob([data], { type })
	const url = window?.URL?.createObjectURL(blob)
	const a = document.createElement(`a`)
	a.style.display = `none`
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	window.URL.revokeObjectURL(url)
	a.remove()
}

const downloadFromResponse = (response: AxiosResponse<Buffer>): string => {
	const buffer = response.data
	const filename = filenameFromResponse(response)
	downloadFileFromBuffer(buffer, filename, response.request.getResponseHeader('Content-Type') ?? 'application/pdf')
	return filename
}

const filenameFromResponse = (response: AxiosResponse<Buffer>): string => {
	const filename =
		response.request.getResponseHeader('Content-Disposition')?.split('filename=')[1].split('"').join('') ?? ''
	return filename
}

export interface DownloadOptions {
	path: string
	method?: 'GET' | 'POST'
	data: unknown
}

export function downloadFile({ path, method = 'GET', data }: DownloadOptions) {
	const promise = httpClient.request({
		url: path,
		data: data,
		method: method,
		responseType: 'arraybuffer',
	})
	toast.promise(promise, {
		loading: 'Downloading...',
		// description: 'This may take up to 10 seconds.',
		success: (response: AxiosResponse<Buffer>) => {
			const filename = filenameFromResponse(response)
			downloadFromResponse(response)
			return `Downloaded ${filename}!`
		},
		error: 'Error downloading file.',
	})
}
