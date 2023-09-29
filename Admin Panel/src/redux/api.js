import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:3333/api/v1";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "neighbour-api",
  tagTypes: ["User", "Watch", "LANDF", "Skill", "Sell", "Forum", "Report"],
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
    pictureUpload: build.mutation({
      query: (imageFile) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file", imageFile);
        console.log({ bodyFormData, imageFile });
        return {
          url: "/picture_upload",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: { bodyFormData },
          formData: true,
        };
      },
    }),
    getAllUsers: build.query({
      query: () => "/user_get",
      providesTags: ["User"],
    }),
    getAllWatches: build.query({
      query: () => {
        return {
          url: "/all_watch_admin",
          method: "GET",
        };
      },
      providesTags: ["Watch"],
    }),
    getAllDeletedWatches: build.query({
      query: () => {
        return {
          url: "/all_watch_deleted",
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
    getAllLostAndFoundDeleted: build.query({
      query: () => {
        return {
          url: "/lostandfound_deleted",
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
    getAllSkillsDeleted: build.query({
      query: () => {
        return {
          url: "/all_skills_deleted",
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
          url: "/all_items_admin",
          method: "GET",
        };
      },
      providesTags: ["Sell"],
    }),
    getAllSellsDeletd: build.query({
      query: () => {
        return {
          url: "/all_items_deleted",
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
    getAllForumsDeleted: build.query({
      query: () => {
        return {
          url: "/all_topics_deleted",
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
    getUserStatistics: build.query({
      query: () => {
        return {
          url: "/user_statistics",
          method: "GET",
        };
      },
    }),
    getAllUsersReports: build.query({
      query: () => {
        return {
          url: "/user_reports",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    getAllPostsReports: build.query({
      query: () => {
        return {
          url: "/reports",
          method: "GET",
        };
      },
      providesTags: ["Report"],
    }),
    reportAction: build.mutation({
      query: (data) => {
        return {
          url: "/report_action",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Report"],
    }),
    getRecentLogins: build.query({
      query: () => {
        return {
          url: "/recent_logins",
          method: "GET",
        };
      },
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
  useGetUserStatisticsQuery,
  useGetAllUsersReportsQuery,
  useGetAllPostsReportsQuery,
  usePictureUploadMutation,
  useGetAllLostAndFoundDeletedQuery,
  useGetAllDeletedWatchesQuery,
  useGetAllForumsDeletedQuery,
  useGetAllSellsDeletdQuery,
  useGetAllSkillsDeletedQuery,
  useGetRecentLoginsQuery,
  useReportActionMutation,
} = api;

export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${baseURL}/picture_upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        resolve(response.imageUrls);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
