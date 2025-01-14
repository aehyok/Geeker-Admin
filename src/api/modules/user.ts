import http from "@/api";
/**
 * @name 用户管理模块
 */
export const getUserListApi = (params: any) => {
  return http.get(`/infra/api/basic/User/list`, params, { loading: false });
};

export const postUserApi = (data: any) => {
  return http.post(`/infra/api/basic/User`, data, { loading: false });
};

export const putUserApi = (data: any) => {
  return http.put(`/infra/api/basic/User/${data.id}`, data, { loading: false });
};

export const enableUserApi = (id: any) => {
  return http.put(`/infra/api/basic/User/enable/${id}`, {}, { loading: false });
};

export const disableUserApi = (id: any) => {
  return http.put(`/infra/api/basic/User/disable/${id}`, {}, { loading: false });
};

export const deleteUserApi = (params: any) => {
  return http.delete(`/infra/api/basic/User`, params, { loading: false });
};
