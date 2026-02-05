import { baseApi } from "../baseApi";

const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPushNotificationData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/push-notification-deliverability?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["notifications"],
    }),
    getDailyDigestData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/daily-digest-success-by-channel?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["notifications"],
    }),
    getOptInRateData: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/opt-in-rates-by-country?year=${year}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetPushNotificationDataQuery,
  useGetDailyDigestDataQuery,
  useGetOptInRateDataQuery,
} = notificationsApi;
