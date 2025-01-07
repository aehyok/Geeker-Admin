/**
 * tree数据转换为 label value
 * @param list
 * @param filterId 排除的id，暂时只筛选掉一个
 * @returns
 */
export const convertTreeData = (list: any, filterId: any = undefined) => {
  return list
    .filter(a => filterId === undefined || a.id !== filterId)
    .map(item => ({
      label: item.name,
      value: item.id,
      children: item.children ? convertTreeData(item.children, filterId) : null
    }));
};
