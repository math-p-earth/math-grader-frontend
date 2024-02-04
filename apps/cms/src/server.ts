import payload from 'payload'

import express from 'express'
import cron from 'node-cron'

import { PAYLOAD_SECRET, PORT } from './config'
import { removeExpiredUploads } from './cron'

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
	res.redirect('/admin')
})

async function start() {
	// Initialize Payload
	await payload.init({
		secret: PAYLOAD_SECRET,
		express: app,
		onInit: () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		},
	})

	// every 30 mins
	cron.schedule('0/30 * * * *', removeExpiredUploads, {
		runOnInit: true,
	})
	payload.logger.info('Cron jobs scheduled')

	app.listen(PORT, () => {
		payload.logger.info(`Server started on port ${PORT}`)
	})
}

start()
