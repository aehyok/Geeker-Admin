<template>
  <div>
    <ProTable
      ref="proTableRef"
      :columns="columns"
      :request-api="getRoleListApi"
      :init-param="roleParameters"
      :pagination="pagination"
      :data-callback="dataCallback"
      :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
        <!-- <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加菜单</el-button> -->
        <!-- <el-button type="primary" :icon="Download" plain @click="downloadFile">导出字典项</el-button> -->
        <!-- <el-button type="primary" plain @click="toDetail">To 平级详情页面</el-button> -->
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteClick(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <RoleDrawer ref="roleDrawerRef" />
  </div>
</template>

<script setup lang="ts" name="roleManage">
import ProTable from "@/components/ProTable/index.vue";
import { reactive, ref, onMounted } from "vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getRoleListApi, postRoleApi, putRoleApi, deleteRoleApi } from "@/api/modules/role";
import RoleDrawer from "./components/RoleDrawer.vue";
import { useHandleData } from "@/hooks/useHandleData";
import { ProTableInstance } from "@/components/ProTable/interface";

const roleDrawerRef = ref<InstanceType<typeof RoleDrawer> | null>(null);

const proTableRef = ref<ProTableInstance>();
const openDrawer = (title: string, row: any = {}) => {
  console.log(proTableRef.value, row);
  if (Object.keys(row).length === 0) {
    row.isEnable = true;
  }
  const params = {
    title,
    isView: title === "查看",
    row: { ...row, platformType: 1 },
    api: title === "新增" ? postRoleApi : title === "编辑" ? putRoleApi : undefined,
    getTableList: proTableRef.value?.getTableList
  };
  roleDrawerRef.value?.acceptParams(params);
};

const roleParameters = reactive({
  page: 1,
  limit: 10,
  keyword: ""
});

const dataCallback = (data: any) => {
  console.log(data, "dataCallback");
  return {
    list: data.data,
    total: data.total
  };
};

const deleteClick = async (parameter: any) => {
  await useHandleData(deleteRoleApi, parameter.id, `删除【${parameter.name}】角色`);
  // proTable.value?.getTableList();
  proTableRef.value?.getTableList();
};
const pagination = ref(true);
// 表格配置项
const columns = reactive([
  { prop: "name", label: "角色名称" },
  { prop: "code", label: "角色代码" },
  { prop: "remark", label: "角色描述" },
  {
    prop: "isEnable",
    label: "是否启用",
    render: (scope: any) => {
      return scope.row.isEnable === true ? "启用" : "禁用";
    }
  },
  { prop: "order", label: "排序" },
  { prop: "operation", label: "操作", fixed: "right" }
]);

onMounted(async () => {
  console.log("onMounted");
});
</script>
