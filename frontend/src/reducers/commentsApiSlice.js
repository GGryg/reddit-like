import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const commentsAdapter = createEntityAdapter({});

const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComments: builder.query({
            query: () => '/comments',
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: resData => {
                const loadedComments = resData.map((comment
                ) => {
                    comment.id = comment._id;
                    return comment;
                });
                return commentsAdapter.setAll(initialState, loadedComments);
            },
        }),
        getPostComment: builder.query({
            query: (postId) => {
                return {
                    url: `/comments?filter[post]=${postId}`,
                };
            },
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 10,
            transformResponse: resData => {
                const loadedComments = resData.map((comment) => {
                    comment.id = comment._id;
                    return comment;
                });
                return commentsAdapter.setAll(initialState, loadedComments);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Commet', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Comment', id }))
                    ]
                } else return [{ type: 'Comment', id: 'LIST' }]
            }
        }),
        addComment: builder.mutation({
            query: (commentData) => ({
                url: '/comments',
                method: 'POST',
                body: {
                    ...commentData,
                }
            }),
            invalidatesTags: ['Comment']
        })
    })
})

export const { useGetCommentsQuery, useGetPostCommentQuery, useAddCommentMutation } = commentsApiSlice;

export const selectComments = commentsApiSlice.endpoints.getComments.select();
export const selectPostComments = commentsApiSlice.endpoints.getPostComment.select();

const selectCommentsData = createSelector(
    selectComments,
    commentsResult => commentsResult.data,
);

const selectPostCommentsData = createSelector(
    selectPostComments,
    commentsResult => commentsResult.data,
);

export const {
    selectAll: selectAllComments,
    selectById: selectCommentById,
    selectIds: selectCommentIds,
} = commentsAdapter.getSelectors(state => selectCommentsData(state) ?? initialState)

export const {
    selectAll: selectAllPostComments,
    selectById: selectPostCommentById,
    selectIds: selectPostCommentIds,
} = commentsAdapter.getSelectors(state => selectPostCommentsData(state) ?? initialState)