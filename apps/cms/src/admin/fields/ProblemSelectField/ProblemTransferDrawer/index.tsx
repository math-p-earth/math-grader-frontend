import React, { useState } from 'react'

import { useField } from 'payload/components/forms'
import { Drawer, DrawerToggler } from 'payload/dist/admin/components/elements/Drawer'

import { Select, Transfer } from 'antd'

import { ProblemCard } from '../../../components/ProblemCard'
import { useFilterProblems } from '../../../hooks/useFilterProblems'
import { useFilterSources } from '../../../hooks/useFilterSources'
import { useFilterTags } from '../../../hooks/useFilterTags'

interface ProblemTransferDrawerProps {
	path: string
	toggleLabel: string
}

// TODO: implement reordering
export function ProblemTransferDrawer({ path, toggleLabel }: ProblemTransferDrawerProps) {
	const { value: problemIds, setValue } = useField<string[]>({ path })
	const [sourceSearchInput, setSourceSearchInput] = useState('')
	const [tagSearchInput, setTagSearchInput] = useState('')
	const [problemSearchInput, setProblemSearchInput] = useState('')

	const [sourceId, setSourceId] = useState<string | undefined>()
	const [tagId, setTagId] = useState<string | undefined>()

	// get sources
	const {
		query: { data: sourcesData },
	} = useFilterSources({ searchInput: sourceSearchInput, limit: 10, depth: 0 })

	// get tags
	const {
		query: { data: tagsData },
	} = useFilterTags({ searchInput: tagSearchInput, limit: 10 })

	// get left-side problems
	const {
		query: { data: problemsData },
	} = useFilterProblems({
		searchInput: problemSearchInput,
		sourceId,
		tagId,
		limit: 100,
	})

	// get right-side problems
	const {
		query: { data: selectedProblemsData },
	} = useFilterProblems({ ids: problemIds })
	const problems = [...(problemsData?.docs ?? []), ...(selectedProblemsData?.docs ?? [])].filter(
		// unique filter
		(value, index, arr) => arr.indexOf(value) === index,
	)

	const onChangeTag = (value: string) => {
		setTagId(value)
	}
	const onChangeSource = (value: string) => {
		setSourceId(value)
	}
	const onChangeProblem = (_targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => {
		if (direction === 'left') {
			setValue(problemIds.filter((id) => !moveKeys.includes(id)))
			return
		}
		// to keep new problems at the end of the list
		setValue([...problemIds, ...moveKeys])
	}

	const drawerSlug = `problem-transfer-${path}`

	return (
		<div>
			<DrawerToggler
				slug={drawerSlug}
				className="mb-4 flex cursor-pointer items-center rounded-md bg-zinc-600 p-2 text-sm leading-4 text-zinc-100 hover:bg-zinc-500 dark:bg-zinc-100 hover:dark:bg-zinc-200"
			>
				{toggleLabel}
			</DrawerToggler>
			<Drawer slug={drawerSlug} title="Select Problems">
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<Select
							options={sourcesData?.docs.map((source) => ({
								label: source.name,
								value: source.id,
							}))}
							allowClear
							showSearch
							placeholder="Filter by sources"
							filterOption={false}
							onSearch={setSourceSearchInput}
							onChange={onChangeSource}
						/>
						<Select
							options={tagsData?.docs.map((tag) => ({
								label: tag.name,
								value: tag.id,
							}))}
							allowClear
							showSearch
							placeholder="Filter by tag"
							filterOption={false}
							onSearch={setTagSearchInput}
							onChange={onChangeTag}
						/>
					</div>
					<Transfer
						className="[&_.ant-transfer-list-content-item-text]:overflow-auto [&_.ant-transfer-list]:h-[700px] [&_.ant-transfer-list]:grow"
						dataSource={problems.map((problem) => ({
							...problem,
							key: problem.id,
						}))}
						render={(problem) => <ProblemCard problem={problem} />}
						targetKeys={problemIds}
						onChange={onChangeProblem}
						filterOption={() => true} // to bypass filter option
						showSearch
						onSearch={(direction, value) => {
							if (direction === 'left') {
								setProblemSearchInput(value)
							}
						}}
					/>
				</div>
			</Drawer>
		</div>
	)
}
