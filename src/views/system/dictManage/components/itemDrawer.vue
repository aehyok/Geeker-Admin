<!-- eslint-disable prettier/prettier -->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}字典项`" @open="openClick">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
      >
      <el-form-item label="上级字典" prop="dictionaryItemParentId">
        <el-tree-select
          v-model="dictionaryItemParentId"
          :data="treeList"
          filterable
          value-key="value"
          :check-strictly="true"
          :props="defaultProps"
          :default-expand-all="defaultExpand"
          @node-click="handleNodeClick"
          clearable
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="字典名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="字典编码" prop="code">
        <el-input v-model="drawerProps.row!.code" placeholder="字典编码" clearable></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input type="number" v-model="drawerProps.row!.order" placeholder="请输入排序" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="drawerProps.row!.remark" placeholder="请输入备注" :rows="2" type="textarea" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="MenuDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Menu } from "@/api/interface";
import { getDictionaryItemApi } from "@/api/modules/dict";
import { convertTreeData } from "@/utils/convert";

interface TreeNode {
  name: string;
  id: number;
}

const defaultProps = {
  children: "children",
  label: "label"
};

const rules = reactive({
  name: [{ required: true, message: "请输入名称" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  dictionaryGroupId: string;
  row: Partial<Menu.ResMenuList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const treeList = ref<TreeNode[]>([]);
const drawerVisible = ref(false);
const defaultExpand = ref(true);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  dictionaryGroupId: "",
  row: {}
});

const handleNodeClick = (tree: any) => {
  console.log(tree, "tree---data");
};

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

const getDictionaryItemList = async () => {
  const result: any = await getDictionaryItemApi({ dictionaryGroupId: drawerProps.value.dictionaryGroupId });
  if (result && result.code === 200) {
    console.log(result.data);
    const list = convertTreeData(result.data, drawerProps.value.row!.id);
    treeList.value = [
      {
        value: "0",
        label: "无"
      },
      ...list
    ];

    console.log(treeList.value, list, "treeList.vaue");
  }
};

const dictionaryItemParentId = ref();
const openClick = async () => {
  dictionaryItemParentId.value = drawerProps.value.row!.parentId;
  console.log(dictionaryItemParentId.value, "dictionaryItemParentId.value");
  await getDictionaryItemList();
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      const form = { ...drawerProps.value.row, parentId: dictionaryItemParentId.value };
      await drawerProps.value.api!(form);
      ElMessage.success({ message: `${drawerProps.value.title}字典项成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
