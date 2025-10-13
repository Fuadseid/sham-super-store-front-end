export const paymentMethodEndpoints = (builder) => ({
    getPaymentMethods: builder.query({
        query: () => ({
            url: "all_paymentmethods",
            method: "GET",
        }),
    }),
    getPublicMethods: builder.query({
        query: () => ({
            url: "public/get-paymentmethod",  
            method: "GET",
        }),
    }),
});