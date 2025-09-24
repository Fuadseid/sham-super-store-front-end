export const authEndpoints = (builder) => ({
    register: builder.mutation({
        query: (data) => ({
            url: 'register-as-customer',
            method: "POST",
            body: data
        }),
    }),
    login: builder.mutation({
        query:(data)=>({
            url: 'login',
            method: "POST",
            body: data 
        })
    }),
    forgetpassword:builder.mutation({
        query:(data)=>({
            url:"forget-password-otp",
            method:"POST",
            body:data,
        })
    })
});
