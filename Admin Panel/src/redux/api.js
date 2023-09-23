import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "neighbour-api",
  tagTypes: ["User", "Watch", "LANDF", "Skill", "Sell", "Forum"],
  endpoints: (build) => ({
    Register: build.mutation({
      query: (data) => {
        return {
          url: "/user_register",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    Login: build.mutation({
      query: (data) => {
        return {
          url: "/user_login",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    verifyOTP: build.mutation({
      query: (data) => {
        return {
          url: "/reset_passcode",
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    resetPassword: build.mutation({
      query: (data) => {
        return {
          url: `/reset_password`,
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    userUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/user_update/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["User"],
    }),
    getAllUsers: build.query({
      query: () => "/user_get",
      providesTags: ["User"],
    }),
    getAllWatches: build.query({
      query: () => {
        return {
          url: "/all_watch",
          method: "GET",
        };
      },
      providesTags: ["Watch"],
    }),
    updateWatch: build.mutation({
      query: (param) => {
        return {
          url: `/update_watch/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Watch"],
    }),
    getAllLostAndFound: build.query({
      query: () => {
        return {
          url: "/lostandfound",
          method: "GET",
        };
      },
      providesTags: ["LANDF"],
    }),
    updateLostAndFound: build.mutation({
      query: (param) => {
        return {
          url: `/lostandfound_update/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["LANDF"],
    }),
    getAllSkills: build.query({
      query: () => {
        return {
          url: "/all_skills",
          method: "GET",
        };
      },
      providesTags: ["Skill"],
    }),
    updateSkills: build.mutation({
      query: (param) => {
        return {
          url: `/update_skill/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Skill"],
    }),
    getAllSells: build.query({
      query: () => {
        return {
          url: "/all_items",
          method: "GET",
        };
      },
      providesTags: ["Sell"],
    }),
    updateSells: build.mutation({
      query: (param) => {
        return {
          url: `/update_sell/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Sell"],
    }),
    getAllForums: build.query({
      query: () => {
        return {
          url: "/all_topics",
          method: "GET",
        };
      },
      providesTags: ["Forum"],
    }),
    updateForum: build.mutation({
      query: (param) => {
        return {
          url: `/update_topic/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Forum"],
    }),
  }),
});

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useUserUpdateMutation,
  useGetAllUsersQuery,
  useGetAllWatchesQuery,
  useUpdateWatchMutation,
  useGetAllLostAndFoundQuery,
  useUpdateLostAndFoundMutation,
  useGetAllSkillsQuery,
  useUpdateSkillsMutation,
  useGetAllSellsQuery,
  useUpdateSellsMutation,
  useGetAllForumsQuery,
  useUpdateForumMutation,
} = api;
