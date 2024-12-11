import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8080";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }), // Adjust the base URL
  endpoints: (builder) => ({
    // Query to fetch categories
    getCategories: builder.query({
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),

    // Query to fetch labels
    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ["labels"],
    }),

    // Mutation to add a transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // Mutation to delete a transaction
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = apiSlice;

export default apiSlice;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseURI = 'http://localhost:8080';

// export const apiSlice = createApi({
//     baseQuery : fetchBaseQuery({ baseUrl : baseURI}),
//     endpoints : builder => ({
//         // get categories
//         getCategories : builder.query({
//             // get: 'http://localhost:8080/api/categories'
//             query: () => '/api/categories',
//             providesTags: ['categories']
//         }),

//         // get labels
//         getLabels : builder.query({
//             // get: 'http://localhost:8080/api/labels'
//             query : () => '/api/labels',
//             providesTags: ['transaction']
//         }),

//         // add new Transaction
//         addTransaction : builder.mutation({
//             query : (initialTransaction) => ({
//                   // post: 'http://localhost:8080/api/transaction'
//                 url: '/api/transaction',
//                 method: "POST",
//                 body: initialTransaction
//             }),
//             invalidatesTags: ['transaction']
//         }),

//         // delete record
//         deleteTransaction : builder.mutation({
//             query : recordId => ({
//                 // delete: 'http://localhost:8080/api/transaction'
//                 url : '/api/transaction',
//                 method : "DELETE",
//                 body : recordId
//             }),
//             invalidatesTags: ['transaction']
//         })

//     })
// })

// export default apiSlice;
