import payload from 'payload'

export async function removeExpiredPendingUploads(now: Date | 'manual' | 'init') {
	payload.logger.info(`[removeExpiredPendingUploads] cron started: now = ${now}`)
	const date = typeof now === 'string' ? new Date() : now
	const result = await payload.delete({
		collection: 'pending-uploads',
		where: {
			expiresAt: {
				less_than: date.toISOString(),
			},
		},
	})
	if (result.errors.length > 0) {
		payload.logger.error('[removeExpiredPendingUploads] Error removing expired pending uploads', { errors: result.errors })
		return
	}
	payload.logger.info(`[removeExpiredPendingUploads] Removed ${result.docs.length} expired pending uploads`)
}
