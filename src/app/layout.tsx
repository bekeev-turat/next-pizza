import { Nunito } from 'next/font/google'

import './globals.css'
import { Providers } from '@/components/shared/providers'
import Script from 'next/script'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link data-rh='true' rel='icon' href='/logo.png' />
			</head>
			<body className={nunito.className}>
				<Providers>{children}</Providers>
				<Script
					id='google-maps'
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=ru`}
					strategy='afterInteractive'
				/>
			</body>
		</html>
	)
}
