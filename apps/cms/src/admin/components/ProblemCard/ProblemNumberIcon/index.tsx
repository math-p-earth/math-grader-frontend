import React from 'react'

import './index.scss'

const baseClass = 'problem-number-icon'

interface ProblemNumberIconProps {
	children: React.ReactNode
}

export function ProblemNumberIcon({ children }: ProblemNumberIconProps) {
	return <div className={baseClass}>{children}</div>
}
