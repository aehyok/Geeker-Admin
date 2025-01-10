<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`编辑权限`" @open="openClick">
    <el-table
      :data="state.permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      @expand-change="expandChange"
      border
    >
      <el-table-column label="系统模块名称">
        <template #default="{ row }">
          <el-checkbox v-model="row.hasPermission" :label="row.menuName" size="large" @change="handleCheckAllChange(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="功能操作按钮">
        <template #default="{ row }">
          <el-checkbox
            v-for="item in row.operations"
            v-model="item.hasPermission"
            :label="item.menuName"
            @change="handleCheckAllChange(item)"
            :key="item.id"
            size="large"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="role_submit">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="reviseTable" :loading="state.loading">确定</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { getRolePermissionApi } from "@/api/modules/role";
const router = useRouter();

interface DrawerProps {
  roleId: string;
}

// const treeProps = reactive({
//   checkStrictly: false
// });

// const defaultExpandAll = ref(true);
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  roleId: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  console.log(params, "params----");
  drawerProps.value = params;
  drawerVisible.value = true;
};

const state = reactive({
  loading: false,
  tableData: [],
  permissionList: [],
  childrenTreeList: []
});

const convertTableList = (list, id) => {
  const tableData = JSON.parse(JSON.stringify(list));
  state.childrenTreeList = [];
  for (let i = 0; i < tableData.length; i++) {
    if (id === tableData[i].menuId) {
      state.childrenTreeList = tableData[i]?.children;
      break;
    }
    if (state.childrenTreeList.length) {
      return;
    }
    if (tableData[i].children && tableData[i].children.length > 0) {
      tableData[i].children = convertTableList(tableData[i].children, id);
    }
  }
};

const expandChange = (row: any) => {
  console.log("expandChange");
  convertTableList(state.tableData, row.menuId);
  if (Array.isArray(state.childrenTreeList) && state.childrenTreeList.length) {
    row.children = state.childrenTreeList;
  }
};

const getList = async () => {
  state.tableData = [];
  const params = {
    roleId: drawerProps.value.roleId
  };
  const res: any = await getRolePermissionApi(params);
  if (res.code === 200) {
    state.tableData = res.data;
    state.permissionList = JSON.parse(JSON.stringify(res.data));
    state.permissionList.forEach((item: any) => (item.children = [1]));
  }
};

const openClick = () => {
  getList();
};

const cancel = () => {
  router.push({
    name: "roleManage"
  });
};

const reviseTable = async () => {
  state.loading = true;
};

const setAllTableCheck = (list, status) => {
  if (Array.isArray(list) && list.length) {
    for (let i = 0; i < list.length; i++) {
      list[i].hasPermission = status;
      if (Array.isArray(list[i].children)) {
        setAllTableCheck(list[i].children, status);
      }
      if (Array.isArray(list[i].operations)) {
        setAllTableCheck(list[i].operations, status);
      }
    }
  }
};

const setTableData = (allItem, item) => {
  for (let key in allItem) {
    // 找到dataTable的内容，改变的 hasPermission
    if (allItem[key]?.menuId === item.menuId) {
      allItem[key].hasPermission = item.hasPermission;
      if (allItem[key]?.children?.length) {
        setAllTableCheck(allItem[key]?.children, item.hasPermission);
      }
      if (allItem[key]?.operations?.length) {
        setAllTableCheck(allItem[key]?.operations, item.hasPermission);
      }

      // 如果既 children没有长度 operations没有长度，表示是最底层的操作按钮（新增的 保持疑问）
      if (!allItem[key]?.children?.length && !allItem[key]?.operations?.length) {
        // setTableData(allItem[key].children, item);
        allItem[key].hasPermission = item.hasPermission;
      }
    }
    // 如果没找到， 递归查询
    if (allItem[key]?.children?.length) {
      setTableData(allItem[key].children, item);
    }
    // （新增的 保持疑问）
    if (allItem[key]?.operations?.length) {
      setTableData(allItem[key].operations, item);
    }
  }
};

const handleCheckAllChange = (val: any) => {
  const { hasPermission } = val;
  // 如果 val.children[0] === 1 表示是选中的最头部 没有展开页面并且是最根的项， 找到是那一项， 赋值 hasPermission 为 hasPermission
  // if (val.children?.length === 1 && val.children[0] === 1) {
  //   // 循环 data.tableData 将children 和 operations 的所有项设置为 hasPermission
  //   const getChangeOption = data.tableData.find((res) => res.menuId === menuId);
  //   setAllTableCheck(getChangeOption.children, hasPermission);
  //   return;
  // }
  // // 当不是最根部，并且菜单时展开状态
  // if (val.children?.length || val.operations?.length) {
  //   setAllTableCheck(val.children, hasPermission);
  // }
  // 没有菜单 只有操作按钮时
  if (!val.children?.length && val.operations?.length) {
    val.hasPermission = hasPermission;
    val.operations.forEach((res: any) => (res.hasPermission = hasPermission));
    // 改变 data.tableData 的值
    setTableData(state.tableData, val);
  }

  console.log(val, "val");
};

defineExpose({
  acceptParams
});
</script>

<style lang="scss">
.add_role_container {
  // margin: 10px 200px;
}

.role_info {
  display: flex;
  border: var(--el-border);
  flex-wrap: wrap;
  margin: 0 10px;
}

.role_table {
  // border: 1px solid $formBorderColor;
  margin: 10px;
}

.add_role_form {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 25%;
  border-bottom: var(--el-border);

  &:first-child {
    .add_role_name,
    .required {
      border-left: none;
    }
  }
}

.describe {
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .add_role_name {
    width: 100px;
    line-height: 80px;
    text-align: center;
    border-left: none;
  }
}

.required,
.add_role_name {
  display: inline-block;
  width: 100px;
  text-align: center;
  border-right: var(--el-border);
  height: 100%;
  line-height: 35px;
  border-left: var(--el-border);
}

.required {
  &::before {
    content: "*";
    color: red;
    position: relative;
    right: 5px;
  }
}

.add_role_input {
  flex: 1;

  .el-input__inner {
    width: 100%;
    border: 0;
  }
}

.table_menu {
  padding: 0 20px;
  box-sizing: border-box;
}

.role_submit {
  display: flex;
  justify-content: center;
}

.el-table__expand-icon {
  height: 0;
}
</style>
