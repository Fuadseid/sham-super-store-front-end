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
    }),
    addTocart:builder.mutation({
        query:(data)=>({
            url:"/carts",
            method:"POST",
            body:data,
        })
    }),
    getCart:builder.query({
        query:()=>({
            url:"/checkout/calculate-delivery-fee",
            method:"GET"
        })
    }),
    checkout:builder.mutation({
        query:({data})=>({
            url:"/checkout/session",
            method:"POST",
            body:data
        })
    })
})