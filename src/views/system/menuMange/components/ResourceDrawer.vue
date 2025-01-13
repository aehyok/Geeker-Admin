<!-- eslint-disable prettier/prettier -->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="750px" :title="`绑定接口`" @open="openClick">
    <el-table :data="state.list" style="width: 100%">
      <el-table-column prop="date" label="分类" min-width="100">
        <template #default="scope">
            {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="接口列表" min-width="600" >
        <template #default="scope">
          <el-checkbox-group
            v-model="state.checkApiIds"
          >
            <el-checkbox v-for="item in scope.row.operations" :key="item.id" :label="item.id" >
              <span :style="{ color: item.routePattern === state.apiUrl ? 'red' : '#606266' }">{{item.name}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="MenuDrawer">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getMenuResourcesApi, putMenuResourcesBindApi } from "@/api/modules/menu";

const state = reactive<any>({
  list: [],
  checkApiIds: []
});

interface DrawerProps {
  menuId: string;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  menuId: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  console.log(params, "params");
  drawerVisible.value = true;
};

const getMenuResources = async () => {
  const result: any = await getMenuResourcesApi(drawerProps.value.menuId);
  if (result && result.code === 200) {
    console.log(result, "result");
    state.list = result.data;
  }
};

const handleSubmit = async () => {
  console.log(state.checkApiIds, "state.checkApiIds");

  if (state.checkApiIds.length === 0) {
    ElMessage.warning({ message: `请线勾选所需要的接口！` });
  }
  const result: any = await putMenuResourcesBindApi(drawerProps.value.menuId, state.checkApiIds);
  if (result && result.code === 200) {
    ElMessage.warning({ message: `绑定成功！` });
  }
};

const openClick = async () => {
  console.log("openClick", drawerProps.value.menuId);
  await getMenuResources();
};

defineExpose({
  acceptParams
});
</script>
