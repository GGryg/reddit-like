import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(token){
            headers.set("authorization", `Bearer ${token}`);
        }
        //headers.set('Content-Type', 'application/x-www-form-urlencoded');

        return headers;
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Topic', 'Post', 'Comment'],
    endpoints: builder => ({}),
});