'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	className?: string
	/** Направление скролла: x | y | both */
	direction?: 'x' | 'y' | 'both'
}

/**
 * Универсальный скролл-контейнер
 * direction="x" — горизонтальный (по умолчанию)
 * direction="y" — вертикальный
 * direction="both" — оба направления
 */
export const ScrollContainer: React.FC<ScrollContainerProps> = ({
	children,
	className,
	direction = 'x',
	...props
}) => {
	const overflowClass =
		direction === 'x'
			? 'overflow-x-auto overflow-y-hidden'
			: direction === 'y'
				? 'overflow-y-auto overflow-x-hidden'
				: 'overflow-auto'

	return (
		<div
			className={cn(overflowClass, 'scroll-smooth hide-scrollbar', className)}
			{...props}
		>
			{children}
		</div>
	)
}
