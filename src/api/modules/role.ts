import http from "@/api";

/**
 * @name 获取角色列表
 * @returns
 */
export const getRoleListApi = (params: any) => {
  return http.get(`/infra/api/basic/Role/list/1`, params, { loading: false });
};

export const postRoleApi = (data: any) => {
  return http.post(`/infra/api/basic/Role`, data, { loading: false });
};

export const putRoleApi = (data: any) => {
  return http.put(`/infra/api/basic/Role/${data.id}`, data, { loading: false });
};

export const enableRoleApi = (data: any) => {
  return http.put(`/infra/api/basic/Role/enable/${data.id}`, data, { loading: false });
};

export const disableRoleApi = (data: any) => {
  return http.put(`/infra/api/basic/Role/disable/${data.id}`, data, { loading: false });
};

export const deleteRoleApi = (id: any) => {
  return http.delete(`/infra/api/basic/Role/${id}`, {}, { Loading: false });
};
