import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl } from "../apis/apis";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().loanandfound?.userInfo.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "neighbour-api",
  tagTypes: ["Lost", "Activity"],
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
    addEvent: build.mutation({
      query: (data) => {
        return {
          url: "/event/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    updateEvent: build.mutation({
      query: (param) => {
        return {
          url: `/event/update/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    AllEvents: build.query({
      query: () => "/events",
      providesTags: ["Event"],
    }),
    calendarEvents: build.query({
      query: () => "/events/calendar",
      providesTags: ["Event"],
    }),
    getAllUsers: build.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    updateMember: build.mutation({
      query: (param) => {
        return {
          url: `/users/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["User"],
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

export const { useGetUserActivitiesQuery, useLazyGetUserActivitiesQuery } = api;
