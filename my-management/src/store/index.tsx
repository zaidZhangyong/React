// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import { combineReducers } from 'redux';
import login from './reducer/login'; // 导入 login reducer
import navs from './reducer/navs';   // 导入 navs reducer

// 定义持久化配置
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['navs'] // 仅持久化 navs reducer
};

// 创建根 reducer
const rootReducer = combineReducers({
    login,
    navs
});

// 创建持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer // 使用持久化后的 reducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;