import { getSources } from '~/api/source/getSources'

import { DataTable } from '../../../components/DataTable'
import { columns } from './columns'

export default async function SourcesPage() {
	const data = await getSources()

	const rows = data.docs.map((doc) => ({
		...doc,
		href: `/dashboard/sources/${doc.id}`,
	}))

	return (
		<div className="container p-8">
			<div className="mb-8 text-2xl font-semibold">Sources</div>
			<DataTable columns={columns} data={rows} />
		</div>
	)
}
