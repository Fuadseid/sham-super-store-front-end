export const catagoriesEndpoints = (builder) => ({
  getCategories: builder.query({
    query: () => ({
      url: "public/all-catagoris",
      method: "GET",
    }),
  }),
  getcategoryDetail: builder.query({
    query: (id) => ({
      url: `public/productcategor/${id}`,
      method: "GET",
    }),
  }),
  getproductperCategory:builder.query({
    query:(id)=>({
        url:`public/categories/${id}/products`,
        method:"GET",
    }),
  }),
  getCategoriesonNavbar:builder.query
  ({
    query:()=>({
        url:'public/all-catagoris-nav', 
        method:'GET'
    })
  })
});
