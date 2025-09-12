export const bannerendpoints =(builder)=>({

getMyintroBanner: builder.query({
    query:()=>({
        url:'public/intro-swiper',
        method:"GET"
    }),
}),
getFirstbanner:builder.query({
    query:()=>({
        url:"public/first-banner",
        method:"GET"
    })
})

})