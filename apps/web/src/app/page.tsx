import { redirect } from 'next/navigation'

export default async function IndexPage() {
	redirect('/dashboard/problem-lists')
}
