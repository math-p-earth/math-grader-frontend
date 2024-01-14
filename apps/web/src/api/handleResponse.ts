import z from 'zod'

const errorSchema = z.object({
	errors: z.array(
		z.object({
			message: z.string(),
		}),
	),
})

export async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get('Content-Type') || ''
	const isJson = contentType.includes('application/json')
	if (!isJson) {
		throw new Error('Response is not JSON: ' + response.text())
	}
	const data = (await response.json()) as unknown

	if (!response.ok) {
		const result = errorSchema.safeParse(data)
		if (result.success && result.data.errors.length > 0) {
			throw new Error(result.data.errors[0].message)
		}
		if (typeof data === 'string') {
			throw new Error(data)
		}
		throw new Error('Unknown error occured.')
	}

	return data as T
}
