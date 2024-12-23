import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// import { apiSlice } from "../api/apiSlice";

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => "/users",
//       transformResponse: (responseData) => {
//         return responseData;
//       },
//       providesTags: (result, error, arg) => [
//         { type: "User", id: "LIST" },
//         ...(result?.map((user) => ({ type: "User", id: user.id })) || []),
//       ],
//     }),
//   }),
// });

// export const { useGetUsersQuery } = usersApiSlice;
