import http from "@/api";

/**
 * @name 获取菜单树
 * @returns
 */
export const getMenuTreeApi = (params: any) => {
  return http.get(`/infra/api/menu/tree`, params, { loading: false });
};
