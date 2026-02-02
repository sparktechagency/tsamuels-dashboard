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
    getCohortRetentionData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/cohort-retention?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["growth&Retention"],
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
      providesTags: ["growth&Retention"],
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
      providesTags: ["growth&Retention"],
    }),
  }),
});

export const {
  useGetConversionFunnelDataQuery,
  useGetCohortRetentionDataQuery,
} = dashboardApi;
