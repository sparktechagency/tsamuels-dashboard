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
    getPlanMixDistributionData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/plan-mix-distribution?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["revenue"],
    }),
    getUpgradesAndDowngradesData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/upgrades-and-downgrades?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["revenue"],
    }),
    getRecognizedRevenueData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/discounts-refunds-and-revenue?year=${year}`,
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
  useGetPlanMixDistributionDataQuery,
  useGetUpgradesAndDowngradesDataQuery,
  useGetRecognizedRevenueDataQuery,
} = revenueApi;
