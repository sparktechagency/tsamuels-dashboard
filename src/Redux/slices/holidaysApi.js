import { baseApi } from "../baseApi";

const holidaysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHolidaysData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/holidays/",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["holidays"],
    }),
  }),
});

export const { useGetAllHolidaysDataQuery } = holidaysApi;
