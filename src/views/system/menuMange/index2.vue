<template>
  <div class="main-box">
    <TreeFilter
      label="name"
      ref="treeFilterRef"
      title="菜单列表(单选)"
      :data="treeData"
      :default-value="initParam.menuId"
      @change="changeTreeFilter"
    />
    <div class="table-box">
      <ProTable
        ref="proTable"
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增菜单</el-button>
          <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加菜单</el-button>
          <el-button type="primary" :icon="Download" plain @click="downloadFile">导出菜单数据</el-button>
          <el-button type="primary" plain @click="toDetail">To 平级详情页面</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <MenuDrawer ref="drawerRef" />
      <ImportExcel ref="dialogRef" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive, onMounted, nextTick } from "vue";
import { Menu } from "@/api/interface";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import MenuDrawer from "./components/MenuDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import { getMenuTreeApi } from "@/api/modules/menu";
import { exportUserInfo, BatchAddUser } from "@/api/modules/user";
import { deleteMenuApi, postMenuApi, putMenuApi } from "@/api/modules/menu";
import { format } from "date-fns";

const router = useRouter();

// 跳转详情页
const toDetail = () => {
  router.push(`/proTable/useTreeFilter/detail/123456?params=detail-page`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

const treeFilterRef = ref();
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ menuId: "" });
const pagination = ref(false);

const initTableParam = reactive({
  IncludeChilds: false,
  ParentId: initParam.menuId
});
const treeData = ref([]);

const tableData = ref([]);

/**
 * 刚开始加载左侧树
 * @param isInit 是否是初始化的时候加载
 */
const getMenuTree = async (isInit = false) => {
  console.log(treeFilterRef.value.treeRef, "treeFilterRef");
  const params = {
    IncludeChilds: true
  };
  const result: any = await getMenuTreeApi(params);
  console.log(result, "result-menu");
  if (result.code === 200) {
    treeData.value = result.data;
    console.log(isInit, "isInit");
    if (isInit) {
      initParam.menuId = (treeData.value[0] as any).id;
    }
    nextTick(() => {
      treeFilterRef.value.treeRef.setCurrentKey(initParam.menuId);
    });
    if (initParam.menuId) {
      await getMenuList();
      // todo 放在此位置
    }
  }
};

const getMenuList = async () => {
  const params = {
    IncludeChilds: false,
    ParentId: initParam.menuId
  };
  const result: any = await getMenuTreeApi(params);
  console.log(result, "result-menu");
  if (result.code === 200) {
    tableData.value = result.data;
  }
};

onMounted(async () => {
  await getMenuTree(true);
});

// 树形筛选切换
const changeTreeFilter = async (val: string) => {
  ElMessage.success("请注意查看请求参数变化 🤔");
  proTable.value!.pageable.pageNum = 1;
  initParam.menuId = val;

  console.log(val, "val--change");
  await getMenuList();
};

// 表格配置项
const columns = reactive<ColumnProps<Menu.ResMenuList>[]>([
  { type: "index", label: "#", width: 80 },
  { prop: "name", label: "菜单名称", width: 120, search: { el: "input" } },
  { prop: "url", label: "菜单url" },
  { prop: "code", label: "code" },
  { prop: "order", label: "排序" },
  {
    prop: "type",
    label: "菜单类型",
    width: 120,
    enum: [
      {
        label: "目录",
        value: 2
      },
      {
        label: "菜单",
        value: 3
      },
      {
        label: "操作",
        value: 4
      }
    ],
    fieldNames: { label: "label", value: "value" }
  },
  {
    prop: "updatedAt",
    label: "更新时间",
    width: 180,
    render: (scope: any) => {
      return format(new Date(scope.row.updatedAt), "yyyy-MM-dd HH:mm:ss");
    }
  },
  { prop: "operation", label: "操作", width: 330, fixed: "right" }
]);

// 删除
const deleteClick = async (params: Menu.ResMenuList) => {
  console.log(params, "params------");
  await useHandleData(deleteMenuApi, params.id, `删除【${params.name}】菜单`);
  // proTable.value?.getTableList();
  await getMenuTree(false);
};

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportUserInfo, "用户列表", proTable.value?.searchParam)
  );
};

// 批量添加用户
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
const batchAdd = () => {
  const params = {
    title: "用户",
    tempApi: exportUserInfo,
    importApi: BatchAddUser,
    getTableList: proTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null);

const convertTreeData = (list: any) => {
  return list.map(item => ({
    label: item.name,
    value: item.id,
    children: item.children ? convertTreeData(item.children) : null
  }));
};

const openDrawer = (title: string, row: any = {}) => {
  console.log(initTableParam.ParentId, "treeData.value----------");
  const params = {
    title,
    isView: title === "查看",
    row: { ...row, parentId: initParam.menuId, platformType: 1 },
    treeMenuList: convertTreeData(treeData.value),
    api: title === "新增" ? postMenuApi : title === "编辑" ? putMenuApi : undefined,
    getTableList: getMenuTree
  };
  drawerRef.value?.acceptParams(params);
};
</script>
