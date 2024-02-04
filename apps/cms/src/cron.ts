import payload from 'payload'

export async function removeExpiredUploads(now: Date | 'manual' | 'init') {
	payload.logger.info(`[removeExpiredUploads] cron started: now = ${now}`)
	const date = typeof now === 'string' ? new Date() : now
	const result = await payload.delete({
		collection: 'uploads',
		where: {
			and: [
				{
					canExpire: {
						equals: true,
					},
				},
				{
					expiresAt: {
						less_than: date.toISOString(),
					},
				},
			],
		},
	})
	if (result.errors.length > 0) {
		payload.logger.error('[removeExpiredUploads] Error removing expired uploads', { errors: result.errors })
		return
	}
	payload.logger.info(`[removeExpiredUploads] Removed ${result.docs.length} expired uploads`)
}
