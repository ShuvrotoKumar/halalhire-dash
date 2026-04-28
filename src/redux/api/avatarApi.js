import { baseApi } from "./baseApi";

const avatarApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvatar: builder.query({
      query: () => ({
       url: "/auth/find_my_avatar",
       method: "GET",
      }),
      providesTags: ["my avatar"],
    }),
  }),
});

export const {
  useGetAvatarQuery
} = avatarApis;