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
}),
getSecondbanner:builder.query({
    query:()=>({
        url:"public/second-banner", 
        method:"GET"
    })
}),
getThirdbanner:builder.query({
    query:()=>({
        url:"public/third-banner",  
        method:"GET"
    })
}),
getForthbanner:builder.query({
    query:()=>({
        url:"public/fourth-banner",
        method:"GET"
    })
}),
getFifthbanner:builder.query({
    query:()=>({
        url:"public/fifth-banner",
        method:"GET"
    })
}),
getsixthbanner:builder.query({
    query:()=>({
        url:"public/sixth-banner",
        method:"GET"
    })  
})

})