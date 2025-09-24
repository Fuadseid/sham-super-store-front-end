export const customerAddressEndpoints = (builder)=>({
    getCustomerAddresses:builder.query({
        query:()=>({        
            url:'get-my-address',
            method:'GET'    
        })
    })
})