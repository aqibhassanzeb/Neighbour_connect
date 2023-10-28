import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, userGet } from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      const token = getState().loanandfound?.userInfo.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
        let userData = await AsyncStorage.getItem("userData");
        let userInformation = JSON.parse(userData);
        headers.set("authorization", `Bearer ${userInformation.token}`);
      }
      return headers;
    },
  }),
  reducerPath: "neighbour-api",
  tagTypes: ["Lost", "Activity", "Watch"],
  endpoints: (build) => ({
    Register: build.mutation({
      query: (data) => {
        return {
          url: "/user_signup",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    getUserActivities: build.query({
      query: (id) => `user_activities/${id}`,
    }),
    addWatchPost: build.mutation({
      query: (data) => {
        return {
          url: `/add_watch`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Watch"],
    }),
    getWatchPosts: build.query({
      query: () => "/all_watch",
      providesTags: ["Watch"],
    }),
    addHelpful: build.mutation({
      query: (id) => {
        return {
          url: `/helpful/${id}`,
          method: "POST",
          body: {},
        };
      },
    }),
    removeHelpful: build.mutation({
      query: (id) => {
        return {
          url: `/un_helpfull/${id}`,
          method: "POST",
          body: {},
        };
      },
    }),
    getTodos: build.query({
      query: (page) => `/todos?page=${page}`,
      providesTags: ["Todo"],
    }),
    addTodo: build.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation({
      query: (params) => {
        return {
          url: `/todos/${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (params) => {
        return {
          url: `/todos/${params}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Todo"],
    }),
    addWatchCat: build.mutation({
      query: (data) => {
        return {
          url: "/watch_cat_create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["WatchCat"],
    }),
  }),
});

export const {
  useGetUserActivitiesQuery,
  useLazyGetUserActivitiesQuery,
  useLazyGetWatchPostsQuery,
  useGetWatchPostsQuery,
  useAddHelpfulMutation,
  useRemoveHelpfulMutation,
  useAddWatchPostMutation,
} = api;
