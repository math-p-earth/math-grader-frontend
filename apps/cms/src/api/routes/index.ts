import { Endpoint } from 'payload/config'

import authGoogleVerifyHandler from './auth/google/verify'
import problemListDownloadHandler from './problems/download'
import problemsUploadHandler from './problems/upload'
import studentsRegister from './students/register'
import submissionConfirmUploadHandler from './submissions/confirm-upload'
import submissionUploadPendingHandler from './submissions/upload-pending'

const authEndpoints: Endpoint[] = [
	{
		path: '/auth/google/verify',
		method: 'post',
		handler: authGoogleVerifyHandler,
	},
	{
		path: '/students/register',
		method: 'post',
		handler: studentsRegister,
	},
]

const problemEndpoints: Endpoint[] = [
	{
		path: '/problems/upload',
		method: 'post',
		handler: problemsUploadHandler,
	},
	{
		path: '/problems/download',
		method: 'post',
		handler: problemListDownloadHandler,
	},
]

const submissionsEndpoints: Endpoint[] = [
	{
		path: '/submissions/upload-pending',
		method: 'post',
		handler: submissionUploadPendingHandler,
	},
	{
		path: '/submissions/confirm-upload',
		method: 'post',
		handler: submissionConfirmUploadHandler,
	},
]

export const endpoints: Endpoint[] = [...authEndpoints, ...problemEndpoints, ...submissionsEndpoints]
