import http from "@/api";

/**
 * @name 获取字典分组
 * @returns
 */
export const getDictionaryGroupApi = (params: any) => {
  return http.get(`/infra/api/basic/Dictionary/group`, params, { loading: false });
};

/**
 * @name 新增字典分组
 * @param data
 * @returns
 */
export const postDictionaryGroupApi = (data: any) => {
  return http.post(`/infra/api/basic/Dictionary/group`, data, { loading: false });
};

export const putDictionaryGroupApi = (data: any) => {
  return http.put(`/infra/api/basic/Dictionary/group/${data.id}`, data, { loading: false });
};

export const deleteDictionaryGroupApi = (id: any) => {
  return http.delete(`/infra/api/basic/Dictionary/group/${id}`, {}, { Loading: false });
};

/**
 * @name 获取字典项列表
 * @returns
 */
export const getDictionaryItemApi = (params: any) => {
  return http.get(`/infra/api/basic/Dictionary`, params, { loading: false });
};

export const postDictionaryItemApi = (data: any) => {
  return http.post(`/infra/api/basic/Dictionary`, data, { loading: false });
};

export const putDictionaryItemApi = (data: any) => {
  return http.put(`/infra/api/basic/Dictionary/${data.id}`, data, { loading: false });
};
