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
    createHoliday: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/holidays/create",
          method: "post",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["holidays"],
    }),
    editHoliday: builder.mutation({
      query: ({ data, id }) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/holidays/update/${id}`,
          method: "patch",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["holidays"],
    }),
    deleteHoliday: builder.mutation({
      query: ({ id }) => {
        console.log("delete api id", id);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/holidays/delete/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["holidays"],
    }),
  }),
});

export const {
  useGetAllHolidaysDataQuery,
  useCreateHolidayMutation,
  useEditHolidayMutation,
  useDeleteHolidayMutation,
} = holidaysApi;
