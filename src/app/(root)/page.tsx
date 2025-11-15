export const dynamic = 'force-dynamic'

import { Container, Title, TopBar } from '@/components'
import { ProductsGroupList, SortPopup } from '@/components/shared/'
import { sendEmail } from '@/shared/lib'
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas'
import { Stories } from '@/components/shared'
import { FiltersDialog } from '@/components/shared/filters-dialog'

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
			<Container className='mt-10 bg-white'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0,
				)}
			/>

			<Stories />

			<Container className='mt-10 pb-14 px-5'>
				<div className='flex flex-col lg:flex-row gap-5 lg:gap-15'>
					<div className='flex justify-between items-center lg:items-start flex-col sm:flex-row gap-2'>
						<FiltersDialog />
						<div className='lg:hidden'>
							<SortPopup />
						</div>
					</div>

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
