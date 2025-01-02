import http from "@/api";

/**
 * @name 获取菜单树
 * @returns
 */
export const getMenuTreeApi = (params: any) => {
  return http.get(`/infra/api/basic/Menu/tree/1`, params, { loading: false });
};
