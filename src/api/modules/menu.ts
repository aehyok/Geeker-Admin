import http from "@/api";

/**
 * @name 获取菜单树
 * @returns
 */
export const getMenuTreeApi = (params: any) => {
  return http.get(`/infra/api/basic/Menu/tree/1`, params, { loading: false });
};

export const postMenuApi = (data: any) => {
  return http.post(`/infra/api/basic/Menu`, data, { loading: false });
};

export const putMenuApi = (id: any, data: any) => {
  return http.put(`/infra/api/basic/Menu/${id}`, data, { loading: false });
};

export const deleteMenuApi = (id: any) => {
  return http.delete(`/infra/api/basic/Menu/${id}`, {}, { Loading: false });
};
