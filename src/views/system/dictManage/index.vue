<template>
  <div class="main-container">
    <div class="main-left card">
      <div class="main-left-header">
        <h3 style="padding: 5px">字典目录</h3>
        <el-button plain type="primary" @click="openGroupDrawer('新增')">新增目录</el-button>
      </div>
      <div class="search-box">
        <el-input v-model.trim="state.input" placeholder="请输入分组关键字" class="input-with-select"> </el-input>
        <el-button plain type="primary" @click="searchClick">查询</el-button>
      </div>
      <el-table
        ref="groupTableRef"
        :columns="columns"
        :data="groupData"
        @row-click="groupRowClick"
        @current-change="groupRowClick"
        highlight-current-row
        :pagination="pagination"
        border
        height="71vh"
      >
        <el-table-column prop="name" label="字典" />
        <el-table-column prop="code" label="编码" width="60" align="center" />
        <el-table-column prop="" label="操作" width="80" align="center">
          <template #default="scope">
            <el-button type="primary" link @click.stop="openGroupDrawer('编辑', scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main-right card">
      <ProTable
        ref="proTable"
        :columns="itemColumns"
        :data="itemsData"
        :pagination="pagination"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openItemDrawer('新增')">新增字典项</el-button>
          <!-- <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加菜单</el-button> -->
          <!-- <el-button type="primary" :icon="Download" plain @click="downloadFile">导出字典项</el-button> -->
          <!-- <el-button type="primary" plain @click="toDetail">To 平级详情页面</el-button> -->
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openItemDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <GroupDrawer ref="groupDrawerRef" />
      <ItemDrawer ref="itemDrawerRef" />
    </div>
  </div>
</template>

<script setup lang="ts" name="dictManage">
import { reactive, ref, onMounted, nextTick } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import {
  getDictionaryGroupApi,
  getDictionaryItemApi,
  postDictionaryGroupApi,
  putDictionaryGroupApi,
  postDictionaryItemApi,
  putDictionaryItemApi
} from "@/api/modules/dict";
import ProTable from "@/components/ProTable/index.vue";
import GroupDrawer from "./components/groupDrawer.vue";
import ItemDrawer from "./components/itemDrawer.vue";

const groupDrawerRef = ref(null);
const itemDrawerRef = ref(null);

const openDrawer = (val: string, row: any = {}) => {
  console.log(val, row);
};

// const downloadFile = () => {
//   console.log("downloadFile");
// };

const deleteClick = (val: string) => {
  console.log(val);
};

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { prop: "name", label: "字典分组" },
  { prop: "code", label: "编码", width: 80 },
  { prop: "operation", label: "操作", width: 60, fixed: "right" }
]);

// 表格配置项
const itemColumns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "index", label: "#", width: 80 },
  { prop: "name", label: "名称", width: 120, search: { el: "input" } },
  { prop: "code", label: "编码" },
  { prop: "remark", label: "备注" },
  { prop: "order", label: "排序" },
  { prop: "isEnable", label: "是否启用" },
  { prop: "operation", label: "操作", width: 330, fixed: "right" }
]);

const pagination = ref(false);
const groupTableRef = ref();
const groupData = ref([]);
const itemsData = ref([]);
const groupId = ref();
const state = reactive({
  input: ""
});

const openGroupDrawer = (title: string, row: any = {}) => {
  console.log("addGroupDrawer");
  const params = {
    title: title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? postDictionaryGroupApi : title === "编辑" ? putDictionaryGroupApi : undefined,
    getTableList: getDictionaryGroupList
  };
  groupDrawerRef.value?.acceptParams(params);
};

const openItemDrawer = (title: string, row: any = {}) => {
  console.log("addItemDrawer");
  const params = {
    title: title,
    isView: title === "查看",
    row: { ...row, dictionaryGroupId: groupId.value },
    dictionaryGroupId: groupId.value,
    api: title === "新增" ? postDictionaryItemApi : title === "编辑" ? putDictionaryItemApi : undefined,
    getTableList: getDictionaryItemList
  };
  itemDrawerRef.value?.acceptParams(params);
};

// const addClick = (val: any) => {
//   console.log("新增", val);
// };

const groupRowClick = async (row: any) => {
  groupId.value = row.id;
  await getDictionaryItemList();
};

// const editClick = (row: any) => {
//   console.log("编辑", row);
// };

const getDictionaryGroupList = async () => {
  const result: any = await getDictionaryGroupApi({});
  if (result && result.code === 200) {
    console.log(result.data);
    groupData.value = result.data;
    nextTick(async () => {
      if (result.data.length > 0) {
        const row = result.data[0];
        groupTableRef.value.setCurrentRow(row);
        groupId.value = row.id;
        await getDictionaryItemList();
      }
    });
  }
};

const getDictionaryItemList = async () => {
  const result: any = await getDictionaryItemApi({ dictionaryGroupId: groupId.value });
  if (result && result.code === 200) {
    console.log(result.data);
    itemsData.value = result.data;
  }
};

const searchClick = () => {
  console.log("searchClick");
};

onMounted(async () => {
  console.log("onMounted");
  await getDictionaryGroupList();
});
</script>
<style lang="scss" scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.main-left-header {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  height: 35px;
  padding: 2px;
  align-items: center;
  overflow: hidden;
}

.card {
  overflow-y: hidden;
}
.main-left {
  width: 320px;
  border: 1px solid var(--el-border-color-light);
}

.left-table {
  width: calc(100% - 140px);
}

.main-right {
  margin-left: 5px;
  flex: 1 1 auto;
  width: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 2px;
}
</style>
