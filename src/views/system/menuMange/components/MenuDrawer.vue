<!-- eslint-disable prettier/prettier -->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}菜单`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
      >
      <!-- <el-form-item label="用户头像" prop="avatar">
        <UploadImg v-model:image-url="drawerProps.row!.avatar" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip> 头像大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="用户照片" prop="photo">
        <UploadImgs v-model:file-list="drawerProps.row!.photo" height="140px" width="140px" border-radius="50%">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传照片</span>
          </template>
          <template #tip> 照片大小不能超过 5M </template>
        </UploadImgs>
      </el-form-item> -->
      <el-form-item label="上级菜单" prop="parentId">
        <el-tree-select
          v-model="drawerProps.row!.parentId"
          :data="drawerProps.treeMenuList"
          :check-strictly="true"
          value-key="value"
          :default-expand-all="defaultExpand"
          :default-checked-keys="[drawerProps.row!.parentId]"
          @node-click="handleNodeClick"
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="请填写菜单名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="菜单Code" prop="code">
        <el-input v-model="drawerProps.row!.code" placeholder="请填写菜单Code" clearable></el-input>
      </el-form-item>
      <el-form-item label="菜单URL" prop="url">
        <el-input v-model="drawerProps.row!.url" placeholder="请输入菜单URL" clearable></el-input>
      </el-form-item>
      <el-form-item label="图标类型" prop="iconType">
        <el-select v-model="drawerProps.row.iconType" placeholder="请选择图标类型">
          <el-option v-for="item in iconTypeList" :label="item.label" :value="item.value" :key="item.label" />
          <!-- <el-option label="图片" value="2" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="图标" prop="icon" v-if="drawerProps.row!.iconType == 1">
        <el-input v-model="drawerProps.row!.icon" placeholder="请输入图标" clearable></el-input>
      </el-form-item>
      <el-form-item label="选中前图片" prop="icon" v-if="drawerProps.row!.iconType == 2">
        <UploadImg v-model:image-url="drawerProps.row!.icon" width="135px" height="135px" :file-size="1">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传图片</span>
          </template>
          <template #tip> 图片大小不能超过 1M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="选中后图片" prop="activeIcon" v-if="drawerProps.row!.iconType == 2">
        <UploadImg v-model:file-list="drawerProps.row!.activeIcon" height="140px" width="140px">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传图片</span>
          </template>
          <template #tip> 图片大小不能超过 1M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input type="number" v-model="drawerProps.row!.order" placeholder="请输入排序" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="drawerProps.row.isVisible" clearable />
      </el-form-item>
      <el-form-item label="是否外链">
        <el-switch v-model="drawerProps.row.isExternalLink" clearable />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="drawerProps.row!.remark" placeholder="请输入备注" clearable></el-input>
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
import UploadImg from "@/components/Upload/Img.vue";
// import UploadImgs from "@/components/Upload/Imgs.vue";

const rules = reactive({
  parentId: [{ required: true, message: "请选择上级菜单" }],
  name: [{ required: true, message: "请输入菜单名称" }],
  username: [{ required: true, message: "请填写用户姓名" }],
  gender: [{ required: true, message: "请选择性别" }],
  idCard: [{ required: true, message: "请填写身份证号" }],
  email: [{ required: true, message: "请填写邮箱" }],
  address: [{ required: true, message: "请填写居住地址" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  treeMenuList: any;
  row: Partial<Menu.ResMenuList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const iconTypeList = ref([
  { label: "图标", value: 1 },
  { label: "图片", value: 2 }
]);

const drawerVisible = ref(false);
const defaultExpand = ref(true);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  treeMenuList: [],
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

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}菜单成功！` });
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
