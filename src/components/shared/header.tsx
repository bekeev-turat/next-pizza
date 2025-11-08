'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProfileButton } from './profile-button'
import { AuthModal } from './modals'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	const router = useRouter()
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	const searchParams = useSearchParams()

	React.useEffect(() => {
		let toastMessage = ''
		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		} else if (searchParams.has('cancel')) {
			setTimeout(() => {
				router.replace('/')
				toast.error('Ой, что-то не так.', {
					duration: 3000,
				})
			}, 1000)
		}
	}, [])

	return (
		<header className={cn('border-b border-[#f3f3f7] px-5 lg:px-0', className)}>
			<Container className='flex items-center justify-between py-5'>
				
				{/* Левая часть */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.svg' alt='Logo' width={70} height={70} />
						<div className='hidden md:block'>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1 hidden md:block'>
						<SearchInput />
					</div>
				)}

				{/* Правая часть */}
				<div className='flex items-center gap-3'>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
