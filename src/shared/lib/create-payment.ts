import Stripe from 'stripe'

interface Props {
	description: string
	orderId: number
	amount: number // в сомах
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function createPayment(details: Props) {
	const amountInCents = Math.round(details.amount * 100)

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'kgs',
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

	return {
		id: session.id,
		url: session.url,
	}
}
