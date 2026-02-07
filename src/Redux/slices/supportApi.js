import { baseApi } from "../baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/helps/",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["support"],
    }),
    editSupportData: builder.mutation({
      query: ({ data, id }) => {
        console.log("faq edit data", data);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/helps/resolved/${id}`,
          method: "patch",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["support"],
    }),
    deleteSupportData: builder.mutation({
      query: (id) => {
        console.log("faq delete id", id);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/helps/delete/${id}`,
          method: "delete",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["support"],
    }),
  }),
});

export const {
  useGetSupportDataQuery,
  useEditSupportDataMutation,
  useDeleteSupportDataMutation,
} = supportApi;
