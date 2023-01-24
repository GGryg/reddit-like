import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation ({
            query: loginData => ({
                url: '/login',
                method: 'POST',
                body: {...loginData}
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try{
                    await queryFulfilled;
                    dispatch(logout());
                }
                catch (err) {
                    console.error(err);
                }
            }
        }),
    })
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;