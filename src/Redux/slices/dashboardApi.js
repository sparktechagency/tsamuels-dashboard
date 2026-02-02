import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEngagementMetrics: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/engagement-metrics",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["metrics"],
    }),
  }),
});

export const { useGetEngagementMetricsQuery } = dashboardApi;
