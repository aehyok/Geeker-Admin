<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="菜单列表"
      row-key="path"
      :indent="20"
      :columns="columns"
      :request-api="getMenuTreeApi"
      :init-param="initParam"
      :pagination="pageable"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus">新增菜单 </el-button>
      </template>
      <!-- 菜单图标 -->
      <!-- <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template> -->
      <!-- 菜单操作 -->
      <template #operation>
        <el-button type="primary" link :icon="EditPen"> 编辑 </el-button>
        <el-button type="primary" link :icon="Delete"> 删除 </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts" name="menuMange">
import { ref, onMounted, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
// import authMenuList from "@/assets/json/authMenuList.json";
import ProTable from "@/components/ProTable/index.vue";
import { getMenuTreeApi } from "@/api/modules/menu";
const proTable = ref();
const pageable = ref(false);
// const menuData = ref<any>(authMenuList.data);

const initParam = reactive({
  parentId: 0,
  parentCode: "",
  includeChilds: true
});

onMounted(async () => {
  console.log("res");
  // const result = await getMenuTreeApi({
  //   parentId: 0,
  //   parentCode: "",
  //   includeChilds: true
  // });
  // console.log(result, "result-menu");
  // menuData.value = result.data;
});

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "title", label: "菜单名称", align: "left", width: 300 },
  { prop: "icon", label: "菜单图标", width: 120 },
  { prop: "name", label: "菜单 name" },
  { prop: "path", label: "菜单路径", width: 300 },
  { prop: "component", label: "组件路径", width: 300 },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];

// const dataCallback = (response: any) => {
//   if (!response) {
//     return {};
//   }
//   console.log(response, "dddd--ssss");
//   return {
//     list: response
//   };
// };
</script>
