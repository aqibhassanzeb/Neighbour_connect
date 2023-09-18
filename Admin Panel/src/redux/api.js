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
  tagTypes: ["User", "CC", "BC", "DC", "MC", "DVC"],
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
    forgetPassword: build.mutation({
      query: (data) => {
        return {
          url: "/user/forget_password",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    resetPassword: build.mutation({
      query: ({ token, data }) => {
        return {
          url: `/user/reset_password/${token}`,
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    getAllUsers: build.query({
      query: () => "/user/users",
      providesTags: ["User"],
    }),
    updateProfile: build.mutation({
      query: (data) => {
        return {
          url: `user/user_update/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["User"],
    }),
    postCC: build.mutation({
      query: (data) => {
        return {
          url: "/character-certificate",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["CC"],
    }),
    getAllCC: build.query({
      query: () => {
        return {
          url: "/character-certificate",
          method: "GET",
        };
      },
      providesTags: ["CC"],
    }),
    approveCC: build.mutation({
      query: (param) => {
        return {
          url: `/character-certificate/approve/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["CC"],
    }),
    rejectCC: build.mutation({
      query: (param) => {
        return {
          url: `/character-certificate/reject/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["CC"],
    }),
    getCCByUser: build.query({
      query: (id) => {
        return {
          url: `/character-certificate-by-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["CC"],
    }),
    postBC: build.mutation({
      query: (data) => {
        return {
          url: "/birth-certificate",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["BC"],
    }),
    getAllBC: build.query({
      query: () => {
        return {
          url: "/birth-certificate",
          method: "GET",
        };
      },
      providesTags: ["BC"],
    }),
    approveBC: build.mutation({
      query: (param) => {
        return {
          url: `/birth-certificate/approve/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["BC"],
    }),
    rejectBC: build.mutation({
      query: (param) => {
        return {
          url: `/birth-certificate/reject/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["BC"],
    }),
    getBCByUser: build.query({
      query: (id) => {
        return {
          url: `/birth-certificate-by-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["BC"],
    }),
    postDC: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/death-certificate",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["DC"],
    }),
    getAllDC: build.query({
      query: () => {
        return {
          url: "/death-certificate",
          method: "GET",
        };
      },
      providesTags: ["DC"],
    }),
    approveDC: build.mutation({
      query: (param) => {
        return {
          url: `/death-certificate/approve/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["DC"],
    }),
    rejectDC: build.mutation({
      query: (param) => {
        return {
          url: `/death-certificate/reject/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["DC"],
    }),
    getDCByUser: build.query({
      query: (id) => {
        return {
          url: `/death-certificate-by-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["DC"],
    }),
    postDMC: build.mutation({
      query: (data) => {
        return {
          url: "/domicile-certificate",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["DMC"],
    }),
    getAllDMC: build.query({
      query: () => {
        return {
          url: "/domicile-certificate",
          method: "GET",
        };
      },
      providesTags: ["DMC"],
    }),
    approveDMC: build.mutation({
      query: (param) => {
        return {
          url: `/domicile-certificate/approve/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["DMC"],
    }),
    rejectDMC: build.mutation({
      query: (param) => {
        return {
          url: `/domicile-certificate/reject/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["DMC"],
    }),
    getDMCByUser: build.query({
      query: (id) => {
        return {
          url: `/domicile-certificate-by-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["DMC"],
    }),
    postMC: build.mutation({
      query: (data) => {
        return {
          url: "/marriage-certificate",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["MC"],
    }),
    getAllMC: build.query({
      query: () => {
        return {
          url: "/marriage-certificate",
          method: "GET",
        };
      },
      providesTags: ["MC"],
    }),
    approveMC: build.mutation({
      query: (param) => {
        return {
          url: `/marriage-certificate/approve/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["MC"],
    }),
    rejectMC: build.mutation({
      query: (param) => {
        return {
          url: `/marriage-certificate/reject/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["MC"],
    }),
    getMCByUser: build.query({
      query: (id) => {
        return {
          url: `/marriage-certificate-by-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["MC"],
    }),
    postDVC: build.mutation({
      query: (data) => {
        return {
          url: "/divorce-certificate",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["DVC"],
    }),
    getAllDVC: build.query({
      query: () => {
        return {
          url: "/divorce-certificate",
          method: "GET",
        };
      },
      providesTags: ["DVC"],
    }),
    approveDVC: build.mutation({
      query: (param) => {
        return {
          url: `/divorce-certificate/approve/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["DVC"],
    }),
    rejectDVC: build.mutation({
      query: (param) => {
        return {
          url: `/divorce-certificate/reject/${param}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["DVC"],
    }),
    getDVCByUser: build.query({
      query: (id) => {
        return {
          url: `/divorce-certificate-by-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["DVC"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  usePostDMCMutation,
  usePostMCMutation,
  usePostDVCMutation,
  usePostCCMutation,
  useGetAllCCQuery,
  useApproveCCMutation,
  useRejectCCMutation,
  useGetCCByUserQuery,
  usePostBCMutation,
  usePostDCMutation,
  useGetBCByUserQuery,
  useGetAllBCQuery,
  useRejectBCMutation,
  useApproveBCMutation,
  useGetDCByUserQuery,
  useGetAllDCQuery,
  useRejectDCMutation,
  useApproveDCMutation,
  useGetDMCByUserQuery,
  useGetAllDMCQuery,
  useRejectDMCMutation,
  useApproveDMCMutation,
  useGetMCByUserQuery,
  useGetAllMCQuery,
  useRejectMCMutation,
  useApproveMCMutation,
  useGetDVCByUserQuery,
  useGetAllDVCQuery,
  useRejectDVCMutation,
  useApproveDVCMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useUpdateProfileMutation,
} = api;
