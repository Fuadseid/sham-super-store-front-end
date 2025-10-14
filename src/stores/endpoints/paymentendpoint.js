export const paymentEndpoints = (builder)=>({
createCheckoutSession: builder.mutation({
  query: (checkoutData) => ({
    url: '/checkout/session',
    method: 'POST',
    body: checkoutData,
  }),
}),
processCheckout: builder.mutation({
  query: (checkoutData) => ({
    url: '/checkout/process',
    method: 'POST',
    body: checkoutData,
  }),
}),

// In your apiSlice.js
verifyStripeOrder: builder.mutation({
  query: ({ session_id, order_id }) => ({
    url: '/checkout/verify-stripe-order',
    method: 'POST',
    body: { session_id, order_id },
  }),
}),


})