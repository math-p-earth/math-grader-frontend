import { getProblemLists } from '~/api/problem-list/getProblemLists'

import { DataTable } from '../../../components/DataTable'
import { columns } from './columns'

export default async function ProblemListsPage() {
	const data = await getProblemLists()

	const rows = data.docs.map((doc) => ({
		...doc,
		href: `/dashboard/problem-lists/${doc.id}`,
	}))

	return (
		<div className="container p-8">
			<div className="mb-8 text-2xl font-semibold">Problem Lists</div>
			<DataTable columns={columns} data={rows} />
		</div>
	)
}
