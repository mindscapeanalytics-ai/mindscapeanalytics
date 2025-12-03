export const stripeConfig = {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QyXIuRMQYym8XQ0ekIaBZdEKEdi9gXpU4AiSnMLnozptkpQRR5k8Hjvqi5SrAczs1BWMIHOW1ieZefaRdQ3kYcO00ZCtyNiZ5',
}

export const paymentMethods = {
    stripe: { enabled: true, name: 'Credit/Debit Card' },
    crypto: {
        enabled: true,
        name: 'Cryptocurrency',
        wallets: {
            bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            ethereum: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            usdt: 'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9',
        }
    }
}
