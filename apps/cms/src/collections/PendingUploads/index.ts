import { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isLoggedIn } from '../../access/isLoggedIn'
import { isSelf } from '../../access/isSelf'
import { setUserOnCreate } from '../../hooks/field/setUserOnCreate'

export const PendingUploads: CollectionConfig = {
	slug: 'pending-uploads',
	upload: {
		staticDir: '../pending-uploads',
		mimeTypes: ['image/*', 'application/pdf'],
	},
	access: {
		read: isSelf('owner'),
		create: isLoggedIn,
		update: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'owner',
			type: 'relationship',
			relationTo: ['users', 'students'],
			hasMany: false,
			required: true,
			admin: {
				description: "Leave empty to set to current user's ID",
			},
			hooks: {
				beforeValidate: [setUserOnCreate(['users', 'students'])],
			},
		},
		{
			name: 'expiresAt',
			type: 'date',
			required: true,
		},
	],
}
