'use client'

import { Api } from '@/shared/services/api-client'
import React from 'react'
import { Container } from './container'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import { IStory } from '@/shared/services/stories'
import { ScrollContainer } from '../ui/scroll-container'

interface Props {
	className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([])
	const [open, setOpen] = React.useState(false)
	const [selectedStory, setSelectedStory] = React.useState<IStory>()

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll()
			setStories(data)
		}

		fetchStories()
	}, [])

	const onClickStory = (story: IStory) => {
		setSelectedStory(story)

		if (story.items.length > 0) {
			setOpen(true)
		}
	}

	return (
		<>
			<Container className={cn('overflow-hidden', className)}>
				<ScrollContainer className='flex items-center gap-3 my-6 justify-start'>
					{stories.length === 0 &&
						[...Array(6)].map((_, index) => (
							<div
								key={index}
								className='w-[140px] sm:w-[180px] md:w-[200px] h-[200px] sm:h-[230px] md:h-[250px] bg-gray-200 rounded-md animate-pulse'
							/>
						))}
					{stories.map((story) => (
						<img
							key={story.id}
							onClick={() => onClickStory(story)}
							className='rounded-md cursor-pointer object-cover w-[140px] sm:w-[180px] md:w-[200px] h-[200px] sm:h-[230px] md:h-[250px] transition-transform hover:scale-[1.02]'
							src={story.previewImageUrl}
							alt={'' + story.id}
						/>
					))}
				</ScrollContainer>
			</Container>

			{open && (
				<div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'>
					<div className='relative w-full max-w-[520px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg'>
						<button
							className='absolute right-3 top-3 z-30 bg-black/40 hover:bg-black/60 rounded-full p-2 transition'
							onClick={() => setOpen(false)}
						>
							<X className='w-6 h-6 text-white' />
						</button>

						<ReactStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={
								selectedStory?.items.map((item) => ({
									url: item.sourceUrl,
								})) || []
							}
							defaultInterval={3000}
							width='100%'
							height='100%'
						/>
					</div>
				</div>
			)}
		</>
	)
}
