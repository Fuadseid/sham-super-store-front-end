export const bestsellerEndpoints = (builder)=>({
    getbestSeller: builder.query({
        query:()=>({
            url:'public/best-seller',
            method:"GET"
        })
    }),
});