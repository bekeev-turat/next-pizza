import React from 'react'
import { CheckoutItemDetails } from './checkout-item-details'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { Button, Skeleton } from '../ui'
import { cn } from '@/shared/lib/utils'
import { WhiteBlock } from './white-block'
import { ErrorText } from './error-text'
import { CheckoutFormValues } from '@/shared/constants'

const VAT = 15
const DELIVERY_PRICE = 250

interface Props {
	totalAmount: number
	loading?: boolean
	className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	loading,
	className,
}) => {
	const vatPrice = (totalAmount * VAT) / 100
	const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<span className='h-11 text-[34px] font-extrabold'>
						{totalAmount == 0 ? 0 : totalPrice} ₽
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-400' />
						Стоимость корзины:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${totalAmount} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Percent size={18} className='mr-2 text-gray-400' />
						Налоги:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${vatPrice} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-400' />
						Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${totalAmount == 0 ? 0 : DELIVERY_PRICE} ₽`
					)
				}
			/>

			<Button
				loading={loading}
				disabled={totalAmount == 0}
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 mb-2 text-base font-bold'
			>
				Перейти к оплате
				<ArrowRight className='w-5 ml-2' />
			</Button>
			{totalAmount == 0 && <ErrorText text={'Ваша корзина пуста'} />}
		</WhiteBlock>
	)
}
