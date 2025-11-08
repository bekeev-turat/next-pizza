'use client'

// TODO
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/@types/prisma'
import { ProductForm } from '../product-form'
import { ScrollContainer } from '@/components/ui/scroll-container'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-full max-w-[90vw] md:max-w-[70vw] h-[90vh] lg:h-full lg:max-w-[1000px] min-h-[500px] bg-white overflow-hidden rounded-2xl',
					className,
				)}
			>
				<DialogTitle className='hidden'></DialogTitle>
				<ScrollContainer direction='y'>
					<ProductForm product={product} onSubmit={() => router.back()} />
				</ScrollContainer>
			</DialogContent>
		</Dialog>
	)
}
