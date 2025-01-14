<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`" @open="openClick">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="drawerProps.row!.realName" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="drawerProps.row.gender" placeholder="请选择图标类型">
          <el-option v-for="item in genderTypeList" :label="item.label" :value="item.value" :key="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="账户" prop="userName">
        <el-input v-model="drawerProps.row!.userName" placeholder="请输入账户" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="drawerProps.row!.mobile" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="drawerProps.row!.email" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnable">
        <el-switch v-model="drawerProps.row.isEnable" clearable />
      </el-form-item>
      <el-form-item label="角色列表" prop="userRoleId">
        <el-select v-model="drawerProps.row.userRoles" placeholder="请选择角色列表" clearable>
          <el-option v-for="item in roleList" :label="item.name" :value="item.id" :key="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { getRoleListApi } from "@/api/modules/role";

const rules = reactive({
  name: [{ required: true, message: "请输入名称" }],
  code: [{ required: true, message: "请输入编码" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<any>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const genderTypeList = ref([
  { label: "男", value: 1 },
  { label: "女", value: 2 },
  { label: "未知", value: 3 }
]);

const roleList = ref<any>([]);

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  console.log(params, "params----");
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
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const openClick = async () => {
  console.log("openClick");
  const result: any = await getRoleListApi({ page: 1, limit: 1000 });
  if (result && result.code === 200) {
    console.log(result, "角色列表");
    roleList.value = result.data;
  }
};

defineExpose({
  acceptParams
});
</script>
