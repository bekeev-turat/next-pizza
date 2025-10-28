import { Container, Filters, Title, TopBar } from '@/components'
import { ProductsGroupList } from '@/components/shared/'
import { sendEmail } from '@/shared/lub'
import { findPizzas, GetSearchParams } from '@/shared/lub/find-pizzas'
import { Suspense } from 'react'
import { Stories } from '@/components/shared'

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams
}) {
	const _searchParams = await searchParams
	const categories = await findPizzas(_searchParams)

	sendEmail(
		'ffg980568@gmail.com',
		'Next Pizza / 📝 Подтверждение регистрации',
		<div>445110</div>,
	)
	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0,
				)}
			/>

			<Stories />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					{/* Фильтрация */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Список товаров */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									),
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
