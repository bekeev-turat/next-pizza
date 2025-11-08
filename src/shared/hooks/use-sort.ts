'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export type SortType = 'popular' | 'price_desc' | 'price_asc' | 'alphabet'

export const useSort = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const currentSort = (searchParams.get('sort') as SortType) || 'popular'

	const setSort = useCallback(
		(sort: SortType) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set('sort', sort)
			router.push(`?${params.toString()}`)
		},
		[router, searchParams],
	)

	return { currentSort, setSort }
}
