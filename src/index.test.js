import { describe, test, expect } from 'vitest'
import { stripe } from './lib/stripe'

describe('sum test', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)
  })
})

test('stripe', async () => {
  const checkout = await stripe.checkout.sessions.create({})

  expect(checkout.id).toMatch(/cs_test_/)
})
