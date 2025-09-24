export const paymentMethodEndpoints = (builder) => ({
    getPaymentMethods: builder.query({
        query: () => ({
            url: "all_paymentmethods",
            method: "GET",
        }),
    }),
});