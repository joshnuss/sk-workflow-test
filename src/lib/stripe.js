import Stripe from 'stripe'

export const stripe = Stripe('sk_test_1234')

if (process.env.STRIPE_MOCK_HOST) {
  stripe._api.host = process.env.STRIPE_MOCK_HOST
  stripe._api.port = process.env.STRIPE_MOCK_PORT
  stripe._api.protocol = 'http'
}
