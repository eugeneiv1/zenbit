import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {axiosService} from "../../services/axiosService";

interface IState{
    user: {
        user: string | null,
        email: string | null,
    }
}

const initialState: IState = {
    user: {
        user: null,
        email: null,
    }
}

export const signIn = createAsyncThunk('signIn/appSlice', async ({email, password}:{email: string, password: string}) => {
    const userInfo = await axiosService.post('/auth/sign-in', {email, password}).then(({data}) => data);

    return userInfo;
})

export const getUser = createAsyncThunk('getUser/appSlice', async () => {
    const userInfo = await axiosService.get('/user').then(({data}) => data);

    return userInfo;
})




const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers:builder =>
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.user.user = action.payload.user;
                state.user.email = action.payload.email;
                const {accessToken, refreshToken} = action.payload.tokens;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user.user = action.payload.userId;
                state.user.email = action.payload.email;
            })
})

export const {reducer:appReducer, actions: AppActions} = AppSlice;
