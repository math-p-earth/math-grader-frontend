import { Toaster } from 'sonner'

import 'ui/styles/globals.css'

import { CreateSubmissionDialog } from './_create-submission/dialog'
import { Providers } from './providers'

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link
					crossOrigin="anonymous"
					href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
					integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
					rel="stylesheet"
				/>
				<link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
			</head>
			<body className="bg-background text-foreground">
				<Providers>
					<Toaster position="top-right" richColors />
					<CreateSubmissionDialog />
					<div>{children}</div>
				</Providers>
			</body>
		</html>
	)
}
