
import { createSlice } from '@reduxjs/toolkit';


const navs = createSlice({
    name: 'navs',
    initialState: {
        navsList: [{
            label: "首页",
            key: "/home",
            closable: false
        }],
        showKey: "/home"
    },
    reducers: {
        addNavs(state, action) {
            const newNav = action.payload;
            const exists = state.navsList.some(nav => nav.key === newNav.key);
            if (!exists) {
                // 如果不存在，则将新的导航项添加到 navsList 数组中
                state.navsList.push(newNav);
            }
            state.showKey = newNav.key
        },
        removeNavs(state, action) {
            const key = action.payload;
            let showKey: string = ""
            switch (key[0]) {
                case "item": //单独删除一个
                    state.navsList.splice(key[1], 1);
                    showKey = state.navsList[key[1] - 1].key
                    break;
                case 'other'://删除其他
                    if (key[1] == 0) {
                        state.navsList = state.navsList.slice(0, 1);
                        showKey = state.navsList[0].key
                    } else {
                        state.navsList = [state.navsList[0], state.navsList[key[1]]];
                        showKey = state.navsList[1].key
                    }
                    break
                case 'left'://删除左
                    let item = state.navsList[0]
                    state.navsList.splice(0, key[1]);
                    state.navsList = [item, ...state.navsList];
                    const exists = state.navsList.some(nav => nav.key === key[2]);
                    if (!exists) {
                        showKey = state.navsList[1].key
                    }
                    break
                case 'right'://删除右
                    state.navsList.splice(key[1] + 1);
                    const exist1 = state.navsList.some(nav => nav.key === key[2]);
                    if (!exist1) {
                        showKey = state.navsList[key[1]].key
                    }
                    break
                default:
                    break;
            }
            state.showKey = showKey

        },
        setShowKey(state, action) {
            const key = action.payload;
            state.showKey = key
        }

    }
});

export const { addNavs, removeNavs, setShowKey } = navs.actions;
export default navs.reducer;