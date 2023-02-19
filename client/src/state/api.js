import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:'http://172.16.74.58:8000'}),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Crops",
    "Workers",
    "Tasks",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "workerCount",
    "SignIn",
    "Harvest",
    "Expenses",
    "TaskStatus",
    "ExpenseBar",
    "Field",
    "Category",
    "CropAmount",
    "Revenues",
    "SeasonSales",
    "SeasonExpense",
  ],
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (email,password) => ({
        url:'/sign-in',
        method:'POST',
        body:{email,password},
      }),
      providesTags: ["SignIn"],
    }),
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getCrops: build.query({
      query: (email) => `/display-crops/${email}`,
      providesTags: ["Crops"],
    }),
    getHarvest: build.query({
      query: (email) => `/fetch-harvest/${email}`,
      providesTags: ["Harvest"],
    }),
    getWorkers: build.query({
      query: (email) => `/get-workers/${email}`,
      providesTags: ["Workers"],
    }),
    getTasks: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "/display-task-web",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Tasks"],
    }),
    getGeography: build.query({
      query: (adminEmail) => `/get-location/${adminEmail}`,
      providesTags: ["Geography"],
    }),
    getField : build.query({
      query:(email)=>`/get-field/${email}`,
      providesTags:["Field"]
    }),
    getCount:build.query({
      query:(email) => `/get-count/${email}`,
      providesTags:["workerCount"],
    }),
    getTaskStatus : build.query({
      query:(email) => `/get-taskStatus/${email}`,
      providesTags: ["TaskStatus"],
    }),
    getExpense: build.query({
      query: (email) => `/display-exp-cat/${email}`,
      providesTags: ["Expenses"],
    }),
    getCategory : build.query({
      query: (email) => `/get-catExp/${email}`,
      providesTags: ["Category"],
    }),
    getExpenseBar: build.query({
      query: (email) => `/getExpense/${email}`,
      providesTags: ["ExpenseBar"],
    }),
    getSales: build.query({
      query: (email) => `/get-sales/${email}` ,
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getCropAmount: build.query({
      query: (email) => `/get-bar/${email}`,
      providesTags: ["CropAmount"],
    }),
    getRevenue: build.query({
      query: (email) => `/data/${email}`,
      providesTags: ["Revenues"],
    }),
    getSeasonSales : build.query({
      query: (email) => `/display-sales-cat/${email}`,
      providesTags:["SeasonSales"],
    }),
    getSeasonExpense : build.query({
      query: (email) => `/display-expenses-cat/${email}`,
      providesTags:["SeasonExpense"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetCropsQuery,
  useGetWorkersQuery,
  useGetTasksQuery,
  useGetGeographyQuery,
  useGetCountQuery,
  useSignInMutation,
  useGetHarvestQuery,
  useGetExpenseQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetDashboardQuery,
  useGetTaskStatusQuery,
  useGetExpenseBarQuery,
  useGetFieldQuery,
  useGetCategoryQuery,
  useGetCropAmountQuery,
  useGetRevenueQuery,
  useGetSeasonExpenseQuery,
  useGetSeasonSalesQuery
} = api;
