import { Check, CheckCircle, CircleDashed, X, XCircle } from 'lucide-react'
import { GetMySubmissionsResponse } from '~/hooks/useMySubmissions'

import { Tooltip } from 'ui/components/ui/tooltip'

interface SubmissionStatusProps {
	status: GetMySubmissionsResponse['docs'][number]['status']
	size?: number
}

export function SubmissionStatus({ status, size = 16 }: SubmissionStatusProps) {
	if (!status) {
		return null
	}
	switch (status) {
		case 'CORRECT_APPROVED':
			return <CheckCircle size={size} className="text-green-700" />
		case 'CORRECT':
			return (
				<Tooltip
					content="The submission's answer is correct, but has not yet been manually approved by instructor."
					className="flex cursor-pointer items-center gap-2"
				>
					<Check size={size} className="text-green-700" />
					<CircleDashed size={size} className="text-orange-400" />
				</Tooltip>
			)
		case 'INCORRECT_APPROVED':
			return <XCircle size={size} className="text-red-500" />
		case 'INCORRECT':
			return (
				<Tooltip
					content="The submission's answer is incorrect, but has not yet been manually approved by instructor."
					className="flex cursor-pointer items-center gap-2"
				>
					<X size={size} className="text-red-500" />
					<CircleDashed size={size} className="text-orange-400" />
				</Tooltip>
			)
		case 'PENDING':
			return <CircleDashed size={size} className="text-orange-400" />
	}
}
