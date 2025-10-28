import Stripe from 'stripe'

interface Props {
	description: string
	orderId: number
	amount: number // в рублях (или другой валюте)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function createPayment(details: Props) {
	// Stripe работает с суммой в *копейках* (или центах)
	const amountInCents = Math.round(details.amount * 100)

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'rub',
					product_data: {
						name: details.description,
					},
					unit_amount: amountInCents,
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		metadata: {
			order_id: details.orderId.toString(),
		},
		success_url: process.env.STRIPE_SUCCESS_URL!,
		cancel_url: process.env.STRIPE_CANCEL_URL!,
	})

	// Stripe возвращает URL на свою страницу оплаты
	return {
		id: session.id,
		url: session.url,
	}
}
