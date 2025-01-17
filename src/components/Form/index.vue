<template>
  <el-row :gutter="20">
    <template v-for="item in formProps.columnList" :key="item.id">
      <ComponentView :column-span="formProps.columnSpan" :column="item" :form-data="formData" v-if="isShow(item, formData)" />
    </template>
  </el-row>
</template>
<script lang="ts" setup>
import ComponentView from "./components/component-view.vue";

interface FormProps {
  columnList: any;
  formData: any;
  columnSpan?: number;
}

const formProps = withDefaults(defineProps<FormProps>(), {
  columnList: [],
  formData: {},
  columnSpan: 4
});

console.log(formProps, "form-index");
const isShow = (column: any, formData: any = {}) => {
  if (column && column.isshowexpression && typeof column.isshowexpression === "string") {
    let flag: boolean = false;
    try {
      const evalFunction = eval(column.isshowexpression);
      flag = evalFunction(formData);
    } catch (e: any) {
      console.log("isshowexpression error!!!", e);
    }

    return flag;
  }
  return true;
};
</script>
