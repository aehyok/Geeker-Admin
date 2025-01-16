<template>
  <div>
    <ProTable
      ref="proTableRef"
      :columns="columns"
      :request-api="getUserListApi"
      :init-param="userParameters"
      :pagination="pagination"
      :data-callback="dataCallback"
      :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteClick(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <UserDrawer ref="userDrawerRef" />
  </div>
</template>

<script setup lang="ts" name="UserManage">
import ProTable from "@/components/ProTable/index.vue";
import { reactive, ref, onMounted } from "vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getUserListApi, postUserApi, putUserApi, deleteUserApi } from "@/api/modules/user";
import UserDrawer from "./components/UserDrawer.vue";
import { useHandleData } from "@/hooks/useHandleData";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";

const userDrawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);

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
    api: title === "新增" ? postUserApi : title === "编辑" ? putUserApi : undefined,
    getTableList: proTableRef.value?.getTableList
  };
  userDrawerRef.value?.acceptParams(params);
};

const userParameters = reactive({
  page: 1,
  limit: 10
});

const dataCallback = (data: any) => {
  console.log(data, "dataCallback");
  return {
    list: data.data,
    total: data.total
  };
};

const deleteClick = async (parameter: any) => {
  await useHandleData(deleteUserApi, parameter.id, `删除【${parameter.name}】角色`);
  proTableRef.value?.getTableList();
};
const pagination = ref(true);

const genderStatus = [
  { label: "男", value: 1 },
  { label: "女", value: 2 },
  { label: "未知", value: 3 }
];

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "index", label: "序号", width: 80 },
  { prop: "realName", label: "姓名", search: { el: "input", key: "keyword", props: { placeholder: "请输入关键字" } } },
  { prop: "userName", label: "账号" },
  { prop: "mobile", label: "手机号码" },
  { prop: "gender", label: "性别", enum: genderStatus, tag: true },
  { prop: "lastLoginTime", label: "最后登录时间" },
  {
    prop: "isEnable",
    label: "用户状态",
    render: (scope: any) => {
      return scope.row.isEnable === true ? "启用" : "禁用";
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 350 }
]);

onMounted(async () => {
  console.log("onMounted");
});
</script>
