import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { Ingredient } from '@prisma/client'
import { cn } from '@/shared/lib/utils'

interface Props {
	id: number
	name: string
	price: number
	imageUrl: string
	ingredients: Ingredient[]
	className?: string
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	return (
		<div
			className={cn(
				'bg-gray-50 p-4 min-w-[288px] rounded-2xl transition-all duration-300 border border-gray-100 hover:border-primary',
				className,
			)}
		>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 rounded-lg h-[200px]'>
					<img className='w-[190px] h-[190px]' src={imageUrl} alt={name} />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-gray-400'>
					{ingredients.map((ingredient) => ingredient.name).join(', ')}
				</p>

				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price} С</b>
					</span>

					<Button variant='secondary' className='text-base font-bold'>
						<Plus size={20} className='mr-1' />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	)
}
