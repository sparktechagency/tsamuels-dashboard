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
    changeUserStatus: builder.mutation({
      query: ({ id, status }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/user-managements/status/${id}`,
          method: "PATCH",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          body: { status },
        };
      },
      invalidatesTags: ["adminControls"],
    }),
    transferOwnership: builder.mutation({
      query: (data) => {
        console.log("family id", data);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/family-management/transfer-ownership",
          method: "post",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["adminControls"],
    }),
    deleteFamily: builder.mutation({
      query: (id) => {
        console.log("family id", id);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/family-management/delete-family/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["adminControls"],
    }),
  }),
});

export const {
  useGetUserAnalyticsDataQuery,
  useGetStatusDistributionDataQuery,
  useGetPlanDistributionDataQuery,
  useGetAllUsersDataQuery,
  useGetAllFamiliesDataQuery,
  useChangeUserStatusMutation,
  useTransferOwnershipMutation,
  useDeleteFamilyMutation,
} = adminControlsApi;
