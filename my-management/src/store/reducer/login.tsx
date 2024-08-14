

// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginToken = createSlice({
    name: 'loginToken',
    initialState: { token: "" },
    reducers: {
        setName(state, action) {
            // state.name = action.payload;
        },
        setAge(state, action) {
            // state.age = action.payload;
        }
    }
});

export const { setName, setAge } = loginToken.actions;
export default loginToken.reducer;