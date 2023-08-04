import { http } from "@/http/request";
import { userApi } from "@/http/interface/user";

const register = (params: any) => {
  return http.post(userApi.register, params);
};

const login = (params: any) => {
  return http.post(userApi.login, params);
};

const logout = (params: any) => {
  return http.post(userApi.logout, params);
};

export default { register, login, logout };
