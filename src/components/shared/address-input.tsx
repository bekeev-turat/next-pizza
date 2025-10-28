'use client'

import React, { useRef, useEffect } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'

interface Props {
	apiKey: string
	value: string
	onChange: (address: string) => void
}

export const AddressInput: React.FC<Props> = ({ apiKey, value, onChange }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: apiKey,
		libraries: ['places'],
	})

	useEffect(() => {
		if (!isLoaded || !inputRef.current) return

		const bishkekBounds = new window.google.maps.LatLngBounds(
			{ lat: 42.8, lng: 74.5 }, // юго-запад
			{ lat: 43.0, lng: 74.7 }, // северо-восток
		)

		const autocomplete = new window.google.maps.places.Autocomplete(
			inputRef.current,
			{
				types: ['address'],
				componentRestrictions: { country: 'KG' },
				bounds: bishkekBounds,
				strictBounds: true,
			},
		)

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace()
			const formatted = place.formatted_address || ''
			onChange(formatted)
		})
	}, [isLoaded, onChange])

	if (!isLoaded) return <div>Загрузка карты...</div>

	return (
		<input
			ref={inputRef}
			type='text'
			placeholder='Введите адрес (Бишкек, Кыргызстан)'
			value={value}
			onChange={(e) => onChange(e.target.value)} // 🔹 теперь обновляем form при вводе
			style={{
				width: '100%',
				height: '40px',
				padding: '0 10px',
				fontSize: '16px',
				borderRadius: '4px',
				border: '1px solid #ccc',
			}}
		/>
	)
}
