<template>
  <el-col :span="formItemProps.column.columnSpan" style="margin-bottom: 8px">
    <component :is="componentType + 'View'" />
  </el-col>
</template>
<script lang="ts" setup name="ComponentView">
import { computed } from "vue";

interface FormItemProps {
  column: any;
  formData: any;
  columnSpan: number;
}

const formItemProps = withDefaults(defineProps<FormItemProps>(), {
  column: {},
  formData: {},
  columnSpan: 4
});

console.log(formItemProps, "formItemProps");
const componentType = computed(() => {
  const type = formItemProps.column.type;
  if (formItemProps.column.type === "select") {
    switch (type) {
      case 1:
        return "radio";
      case 2:
        return "checkbox";
      default:
        return "select";
    }
  }
  return type;
});
</script>
