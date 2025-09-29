import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { bannerendpoints } from "./endpoints/bannerendpoints";
import { bestsellerEndpoints } from "./endpoints/bestsellerendpoints";
import { catagoriesEndpoints } from "./endpoints/catagoriesendpoints";
import { productEndpoints } from "./endpoints/productendpoints";
import { newsEndpoints } from "./endpoints/newsendpoints";
import { authEndpoints } from "./endpoints/authendpoints";
import { orderEndpoints } from "./endpoints/orderendpoints";
import { customerAddressEndpoints } from "./endpoints/customeraddress";
import { paymentMethodEndpoints } from "./endpoints/paymentmethodendpoints";
import { userEndpoints } from "./endpoints/userendpoints";

export const apiSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    //baseUrl: "https://ecom.addisanalytics.com/api/",

    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const csrf_token = state.auth.csrf_token;
      headers.set("X-Tenant", state.auth.tenant);
      headers.set("X-CSRF-TOKEN", csrf_token);
      headers.set("Accept-Language", state.auth.lang);
      if (state.auth.isAuthenticated) {
        const token = state.auth.token;
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    ...bannerendpoints(builder),
    ...bestsellerEndpoints(builder),
    ...catagoriesEndpoints(builder),
    ...productEndpoints(builder),
    ...newsEndpoints(builder),
    ...authEndpoints(builder),
    ...orderEndpoints(builder),
    ...customerAddressEndpoints(builder),
    ...paymentMethodEndpoints(builder),
    ...userEndpoints(builder),

  }),
});

export const {
  useGetMyintroBannerQuery,
  useGetbestSellerQuery,
  useGetCategoriesQuery,
  useGetFirstbannerQuery,
  useGetcategoryDetailQuery,
  useGetOnsaleProductQuery,
  useGetproductperCategoryQuery,
  useGetNewProductQuery,
  useGetProductdetailQuery,
  useGetSecondbannerQuery,
  useGetThirdbannerQuery,
  useGetForthbannerQuery,
  useGetFifthbannerQuery,
  useGetsixthbannerQuery,
  useGetFeaturedProductQuery,
  useGetNewsQuery,
  useGetProductbyreviewQuery,
  useGetCategoriesonNavbarQuery,
  useRegisterMutation,
  useLoginMutation,
  useFetchMyOrdersQuery,
  useGetCustomerAddressesQuery,
  useGetPaymentMethodsQuery,
  useGetMyfavoriteQuery,
  useGetUserDetailsQuery,
  useChangePasswordMutation,
  useUpdateUserDetailsMutation,
  useGetMysupportticketQuery,
  useForgetpasswordMutation,
  useFetchlocationQuery,
  


} = apiSlice;
