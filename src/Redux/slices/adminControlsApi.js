import { baseApi } from "../baseApi";

const adminControlsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalyticsData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/user-analytics",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["adminControls"],
    }),
    getStatusDistributionData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/user-status-distribution",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["adminControls"],
    }),
    getPlanDistributionData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/plan-distribution",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["adminControls"],
    }),
    getAllUsersData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/user-managements/",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["adminControls"],
    }),
    getAllFamiliesData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/family-management/get-families",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["adminControls"],
    }),
  }),
});

export const {
  useGetUserAnalyticsDataQuery,
  useGetStatusDistributionDataQuery,
  useGetPlanDistributionDataQuery,
  useGetAllUsersDataQuery,
  useGetAllFamiliesDataQuery,
} = adminControlsApi;
