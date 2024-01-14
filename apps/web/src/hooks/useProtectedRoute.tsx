'use client'

import { redirect } from 'next/navigation'

import { useUser } from './useUser'

export function useProtectedRoute() {
	const { query } = useUser()
	if (query.isSuccess && !query.data.user) {
		redirect('/login')
	}
	if (query.isError) {
		redirect('/login')
	}
	return {
		loading: query.isLoading,
	}
}
