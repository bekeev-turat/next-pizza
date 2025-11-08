'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Container } from './container'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
import { Category } from '@prisma/client'
import { ScrollContainer } from '../ui/scroll-container'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	const [showLogo, setShowLogo] = React.useState(false)

	React.useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			setShowLogo(scrollY > 80) // показываем логотип, когда хедер скрылся
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div
			className={cn(
				'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 transition-all duration-300',
				className,
			)}
		>
			<Container>
				<ScrollContainer className='flex flex-col md:flex-row gap-4 md:gap-0 lg:items-center lg:justify-between'>
					<div
						className={cn(
							'flex items-center gap-5 transition-all',
							!showLogo && '-mx-[50px] duration-300 gap-0',
						)}
					>
						<img
							src={'/logo.svg'}
							alt='logo'
							width={50}
							height={50}
							className={cn(
								'transition-all duration-100 transform',
								showLogo
									? 'opacity-100 scale-100 translate-y-0'
									: 'opacity-0 scale-75 -translate-y-2',
							)}
						/>

						<Categories items={categories} />
					</div>
					<div className='hidden lg:block'>
						<SortPopup />
					</div>
				</ScrollContainer>
			</Container>
		</div>
	)
}
