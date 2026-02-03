import { baseApi } from "../baseApi";

const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueMetricsData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/revenue-metrics",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["revenue"],
    }),
    getRevenueTrendsData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/revenue-metrics-trends?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["revenue"],
    }),
    getTrialToPaidData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/trial-to-paid-conversion?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["revenue"],
    }),
    getUsersByStateData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/users-by-state?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["growth&Retention"],
    }),
    getTopZipCodesData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/top-zip-codes",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["growth&Retention"],
    }),
  }),
});

export const {
  useGetRevenueMetricsDataQuery,
  useGetRevenueTrendsDataQuery,
  useGetTrialToPaidDataQuery,
} = revenueApi;
