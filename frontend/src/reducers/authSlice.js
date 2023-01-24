import  { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {},
        token: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
                token: action.payload.token,
            };
        },
        logout: (state, action) => {
            return { isAuthenticated: false, token: null,user: {}};
        }
    }
});

export const { setCurrentUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;