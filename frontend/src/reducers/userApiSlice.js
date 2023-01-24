import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: resData => {
                const loadedUsers = resData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
        }),
        getUser: builder.query({
            query: (id) => `/users/user/${id}`,
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 5,
        }),
        addUser: builder.mutation({
            query: userData => ({
                url: '/register',
                method: 'POST',
                body: {
                    ...userData,
                }
            })
        })
    })
})

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation } = usersApiSlice;

export const selectUsers = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsers,
    usersResult => usersResult.data,
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)