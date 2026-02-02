import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversionFunnelData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/conversion-funnel?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["growth&Retention"],
    }),
    getFeatureUsageData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/feature-usage-rates?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    getOnboardingCompletionData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/onboarding-completion?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    getCalendarAndFamilyGrowthData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/calendar-density-and-family-growth?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetConversionFunnelDataQuery } = dashboardApi;
