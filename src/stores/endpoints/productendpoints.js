export const productEndpoints = (builder)=>({
    getOnsaleProduct:builder.query({
        query:()=>({
            url:'public/get-on-sale-product',
            method:'GET'
        })
    }),
    getNewProduct:builder.query({
        query:()=>({
            url:"public/new-products",
            method:"GET"
        })
    })
})