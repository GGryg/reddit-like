import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 10,
            transformResponse: resData => {
                const loadedPosts = resData.map((post) => {
                    post.id = post._id;
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ]
                } else return [{ type: 'Post', id: 'LIST' }]
            }
        }),
        getTopicPosts: builder.query({
            query: (topic) => {
                let string = "";
                if (topic !== 'Home')
                    string = `?filter[topic]=${topic}`
                return {
                    url: `/posts${string}`,
                };
            },
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 10,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ]
                } else return [{ type: 'Post', id: 'LIST' }]
            }
        }),
        getPost: builder.query({
            query: (postId) => `/posts/${postId}`,
        })
    })
})

export const { useGetPostsQuery, useGetTopicPostsQuery, useAddPostMutation, useGetPostQuery } = postsApiSlice;

export const selectPosts = postsApiSlice.endpoints.getPosts.select();
export const selectTopicPosts = postsApiSlice.endpoints.getTopicPosts.select();

const selectPostsData = createSelector(
    selectPosts,
    postsResult => postsResult.data,
);

const selectTopicPostsData = createSelector(
    selectTopicPosts,
    postsResult => postsResult.data,
);

export const {
    selectAll: selectAllPosts,
    selectById: selectPostsById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)

export const {
    selectAll: selectAllTopicPosts,
    selectById: selectTopicPostsById,
    selectIds: selectTopicPostIds,
} = postsAdapter.getSelectors(state => selectTopicPostsData(state) ?? initialState)