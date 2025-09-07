import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { bannerendpoints } from "./endpoints/bannerendpoints";

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
    ...bannerendpoints(builder)

  }),
});

export const {
  useGetMyintroBannerQuery

} = apiSlice;
