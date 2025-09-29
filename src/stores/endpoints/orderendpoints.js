export const orderEndpoints = (builder) => ({
    fetchMyOrders: builder.query({
        query: (data) => ({
            url: 'my-orders',
            method: "GET",
            body: data
        }),
    }),
    fetchlocation:builder.query({
        query:(id)=>({
            url:`/public/locations/${id}`,
            method:"GET",
        })
    })
})