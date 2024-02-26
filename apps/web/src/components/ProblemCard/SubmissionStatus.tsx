import { Check, CheckCircle, CircleDashed, X, XCircle } from 'lucide-react'
import { GetMySubmissionsResponse } from '~/hooks/useMySubmissions'

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
			return (
				<>
					<CheckCircle size={size} className="text-green-700" />
				</>
			)
		case 'CORRECT':
			return (
				<>
					<Check size={size} className="text-green-700" />
					<CircleDashed size={size} className="text-orange-400" /> {/* TODO: add tooltip */}
				</>
			)
		case 'INCORRECT_APPROVED':
			return (
				<>
					<XCircle size={size} className="text-red-500" />
				</>
			)
		case 'INCORRECT':
			return (
				<>
					<X size={size} className="text-red-500" />
					<CircleDashed size={size} className="text-orange-400" />
				</>
			)
		case 'PENDING':
			return (
				<>
					<CircleDashed size={size} className="text-orange-400" />
				</>
			)
	}
}
