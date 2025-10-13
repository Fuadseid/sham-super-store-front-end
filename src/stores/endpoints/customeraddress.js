export const customerAddressEndpoints = (builder)=>({
    getCustomerAddresses:builder.query({
        query:()=>({        
            url:'get-my-address',
            method:'GET'    
        })
    }),
    addCustomerAddress:builder.mutation({
        query:(addressData)=>({
            url:'add-my-address',
            method:'POST',
            body:addressData
        })
    }),
    updateCustomerAddress:builder.mutation({
        query:({id,addressData})=>({
            url:`update-my-address/${id}`,
            method:'PUT',
            body:addressData
        })
    }),
    deleteCustomerAddress:builder.mutation({
        query:()=>({
            url:`remove-my-address`,
            method:'GET'
        })
    }),
    deleteCustomerAddressbyId:builder.mutation({
        query:(id)=>({
            url:`remove-my-address/${id}`,
            method:'GET'
        })
    })


})