import React from 'react'

import { useField } from 'payload/components/forms'

import { parseProblemUpload } from '../../../../../api/routes/problems/upload/problem-parser'
import { ProblemCardList } from '../../../../components/ProblemCardList'

interface RenderInputProps {
	inputPath: string
}

export function RenderInput({ inputPath }: RenderInputProps) {
	const { value: input } = useField<string>({
		path: inputPath,
	})

	if (typeof input === 'undefined') {
		return null
	}

	try {
		const parsedProblems = parseProblemUpload(input)
		return (
			<ProblemCardList
				problems={parsedProblems.map((problem) => ({
					...problem,
					choices: problem.choices?.map((choice) => ({ choice })),
				}))}
			/>
		)
	} catch (err) {
		return (
			<div className="text-red-400">
				<h3>Invalid input</h3>
				{err instanceof Error && (
					<p>
						{err.message}
						<br />
						{err.stack && <code>{err.stack}</code>}
					</p>
				)}
			</div>
		)
	}
}
