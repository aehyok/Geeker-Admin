<template>
  <el-row :gutter="20">
    <template v-for="item in formProps.columnList" :key="item.id">
      <ComponentView v-if="isShow(item, formData)" />
    </template>
  </el-row>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import ComponentView from "./components/component-view.vue";
const state = reactive({
  list: []
});
console.log(state.list);

interface FormProps {
  columnList: any;
  formData: any;
  columnSpan: number;
}

const formProps = withDefaults(defineProps<FormProps>(), {
  columnList: [],
  formData: {},
  columnSpan: 4
});

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
};
</script>
