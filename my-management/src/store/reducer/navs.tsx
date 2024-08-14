
import { createSlice } from '@reduxjs/toolkit';

const navs = createSlice({
    name: 'navs',
    initialState: { navsList: [] },
    reducers: {
        addNavs(state, action) {
            // state.name = action.payload;
        },
    }
});

export const { addNavs } = navs.actions;
export default navs.reducer;