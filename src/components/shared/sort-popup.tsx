'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown } from 'lucide-react'
import { useSort, SortType } from '@/shared/hooks/use-sort'

const sortOptions = [
	// { label: 'Популярное', value: 'popular' },
	{ label: 'Цена (по возрастанию)', value: 'asc' },
	{ label: 'Цена (по убыванию)', value: 'desc' },
	// { label: 'Алфавит', value: 'alphabet' },
]

export const SortPopup = () => {
	const { currentSort, setSort } = useSort()
	const currentLabel =
		sortOptions.find((o) => o.value === currentSort)?.label || 'Популярное'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='inline-flex items-center gap-2 bg-gray-50 px-5 h-[52px] rounded-2xl'>
				<ArrowUpDown size={16} />

				<b>Сортировка:</b>
				<b className='text-primary'>{currentLabel}</b>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-[200px]'>
				{sortOptions.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() => setSort(option.value as SortType)}
						className={
							option.value === currentSort ? 'bg-gray-100 text-primary' : ''
						}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
