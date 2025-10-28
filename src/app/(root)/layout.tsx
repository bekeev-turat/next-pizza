import { Header } from '@/components'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
}

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: ReactNode
}>) {
	return (
		<>
			<Header />
			<main className='min-h-screen'>
				{children}
				{modal}
			</main>
		</>
	)
}
