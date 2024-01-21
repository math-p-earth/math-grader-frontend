import React from 'react'
import { NavLink } from 'react-router-dom'

import { Chevron } from 'payload/components'

const customRoutes = [
	{
		id: 'problems/upload',
		label: 'Upload Problems',
		href: '/admin/problems/upload',
	},
]

export function customRouteLinks() {
	return (
		<div>
			<span className="nav__label">Custom Routes</span>
			<nav>
				{customRoutes.map((route, index) => (
					<NavLink key={index} className="nav__link" activeClassName="active" to={route.href}>
						<Chevron className="nav__link-icon -rotate-90" />
						<span className="nav__link-label">{route.label}</span>
					</NavLink>
				))}
			</nav>
		</div>
	)
}
