'use client'

import React from 'react'
import { WhiteBlock } from '../white-block'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'
import { AddressInput } from '../address-input'
import { FormTextarea } from '@/components/shared/form'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext()

	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AddressInput
								apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
								value={field.value}
								onChange={field.onChange}
							/>
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name='comment'
					className='text-base'
					placeholder='Комментарий к заказу'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}
