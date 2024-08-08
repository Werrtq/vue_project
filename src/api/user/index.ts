import request from "../../utils/request";
import type { loginFormdata, userInfoResponesData, loginResponesData } from "./type";

enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}

export const reqLogin = (data: loginFormdata) => request.post<any, loginResponesData>(API.LOGIN_URL, data);  //这个<any,any>目前不太知道是什么意思。20240724

export const reqUserInfo = () => request.get<any,userInfoResponesData>(API.USERINFO_URL);

export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL);