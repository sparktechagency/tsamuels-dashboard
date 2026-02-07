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
    updatePassword: builder.mutation({
      query: (data) => {
        console.log("update pass data", data);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getSettings: builder.query({
      query: (key) => {
        console.log("settings api key", key);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/settings?key=${key}`,
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    addSettings: builder.mutation({
      query: (data) => {
        console.log("settings api data", data);
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/settings",
          method: "put",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetProfileDataQuery,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetSettingsQuery,
  useAddSettingsMutation,
} = settingsApi;
