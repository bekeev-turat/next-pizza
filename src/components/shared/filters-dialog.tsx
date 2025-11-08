import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Filters } from './filters'
import { Suspense } from 'react'
import { ScrollContainer } from '../ui/scroll-container'
import { DialogTitle } from '@radix-ui/react-dialog'

export function FiltersDialog() {
	return (
		<>
			<div className='w-[250px] hidden lg:block'>
				<Suspense>
					<Filters />
				</Suspense>
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='lg:hidden block w-[200px]' variant='default'>
						<b>Фильтрация</b>
					</Button>
				</DialogTrigger>
				<DialogContent
					className={`
						bg-accent p-6 sm:p-10 
						max-w-[90vw] sm:max-w-[600px]
						w-full rounded-2xl 
						h-[90vh] sm:h-auto
						overflow-hidden
						`}
				>
					<DialogTitle className='hidden'></DialogTitle>
					<ScrollContainer direction='y'>
						<Suspense>
							<Filters />
						</Suspense>
					</ScrollContainer>
				</DialogContent>
			</Dialog>
		</>
	)
}
