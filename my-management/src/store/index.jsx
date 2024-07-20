// //store/index.ts 中
// import { legacy_createStore } from "redux"
// import reducer from "./reducer"
// //legacy_createStore 创建redux
// const store = legacy_createStore(reducer)
// export default store



// //reducer文件
// const data = {
//     token: '11111',
// }

// let reducer = (state = data, active: { //dispatch 激活发送的数据
//     type: string,
//     [propName: string]: any //多个属性为any类型
// }) => {
//   //深拷贝属性
//     let newData = JSON.parse(JSON.stringify(state))
//     switch (active.type) {
//         case "setToken":
//             newData.token = active.data
//             console.log(newData.token);

//             break;
//         case "set1111":
//             console.log(active.data);
//             break;
//     }

//     return newData
// }
// export default reducer