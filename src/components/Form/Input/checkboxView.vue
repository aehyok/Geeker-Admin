<!--checkbox 多选框-->
<template>
  <el-form-item :label="column.label" :prop="column.name" :rules="rules">
    <el-checkbox-group v-model="value">
      <el-checkbox v-for="item in column.dictionaryList" :value="item.code" :key="item.code" :disabled="!!props.column.disabled">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>
<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:data"]);
const props = defineProps({
  column: {
    type: [Object]
  },
  data: {
    type: [Array, String]
  }
});
const isString = typeof props.data === "string";

const rules = [
  {
    // 加上双？？，防止出现选中后提示请选择"this.column.label"
    required: props.column.required ?? false,
    message: `请选择${props.column.label}`,
    trigger: "change"
  }
];

const value = computed({
  get: function () {
    return isString ? props.data.split(",").filter(i => i !== "") : props.data;
  },
  set: function (val) {
    const getVal = isString ? val.join(",") : val;
    emit("update:data", getVal);
  }
});
</script>
