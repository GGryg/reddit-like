import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const topicsAdapter = createEntityAdapter({});

const initialState = topicsAdapter.getInitialState();

export const topicsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTopics: builder.query({
            query: (filter, sort) => { return {url:'/topics', params: {filter, sort}}},
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: resData => {
                const loadedTopics = resData.map((topic) => {
                    topic.id = topic._id;
                    return topic;
                });
                return topicsAdapter.setAll(initialState, loadedTopics);
            },
        }),
        getTopic: builder.query({
            query: (id) => `/topics/${id}`,
            validateStatus: (res, result) => {
                return res.status >= 200 && res.status <= 299 && !result.isError;
            },
            keepUnusedDataFor: 5,
        }),
        addTopic: builder.mutation({
            query: (topicData) => ({
                url: '/topics',
                method: "POST",
                body: {
                    ...topicData,
                }
            })
        })
    })
})

export const { useGetTopicsQuery, useGetTopicQuery, useAddTopicMutation } = topicsApiSlice;

export const selectTopics = topicsApiSlice.endpoints.getTopics.select();

const selectTopicsData = createSelector(
    selectTopics,
    topicsResult => topicsResult.data,
);

export const {
    selectAll: selectAllTopics,
    selectById: selectTopicById,
    selectIds: selectTopicIds,
} = topicsAdapter.getSelectors(state => selectTopicsData(state) ?? initialState)