import { getProblemLists } from '~/api/problem-list/getProblemLists'

import { columns } from './columns'
import { DataTable } from './data-table'

export default async function ProblemListsPage() {
  const data = await getProblemLists()
  return (
    <div className="container p-8">
      <div className="mb-8 text-2xl font-semibold">Problem Lists</div>
      <DataTable columns={columns} data={data.docs} />
    </div>
  )
}
