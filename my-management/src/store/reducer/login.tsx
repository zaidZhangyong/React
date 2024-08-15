

// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: { token: "" },
    reducers: {
        setToken(state, action) {
            state.token = action.payload; // 设置 token
        },
        clearToken(state, action) {
            state.token = ""; // 清空 token
        }
    }
});

export const { setToken, clearToken } = loginSlice.actions;
export default loginSlice.reducer;