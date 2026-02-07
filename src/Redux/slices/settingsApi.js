import { baseApi } from "../baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/users/profile",
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    editProfile: builder.mutation({
      query: (formData) => {
        console.log("edit profile data", formData);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/users/profile/update",
          method: "patch",
          body: formData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
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

export const { useGetProfileDataQuery, useEditProfileMutation } = settingsApi;
