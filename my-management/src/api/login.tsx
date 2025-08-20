import { loginType } from "@/types";
import { request } from "../request/";

//登录
export const LoginApi = (params: loginType) =>
  request.post("/user/login", params, { timeout: 15000 });
