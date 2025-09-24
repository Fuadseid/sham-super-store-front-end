export const  newsEndpoints =(builder)=>({

   getNews:builder.query({
    query:()=>({
        url:'public/news',
        method:'GET'
    })
   }) 
})