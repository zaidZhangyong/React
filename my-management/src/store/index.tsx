// store.js
import { configureStore } from '@reduxjs/toolkit';
import login from './reducer/login';
import navs from './reducer/navs';

const store = configureStore({
    reducer: {
        login,
        navs
    }
});

export default store;