<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-col :span="formItemProps.column.columnSpan" style="margin-bottom: 8px">
    <component
      :is="formItemProps.column.type + 'View'"
      v-model:data="formItemProps.formData[formItemProps.column.name]"
      v-model:form-data="formItemProps.formData"
      :column="column"
      :column-span="columnSpan"
    />
  </el-col>
</template>
<script lang="ts" setup name="ComponentView">
// import { computed } from "vue";

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
// const componentType = computed(() => {
//   const type = formItemProps.column.type;
//   if (formItemProps.column.type === "select") {
//     switch (type) {
//       case 1:
//         return "radio";
//       case 2:
//         return "checkbox";
//       default:
//         return "select";
//     }
//   }
//   return type;
// });
</script>
