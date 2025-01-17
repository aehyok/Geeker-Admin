<!--日期范围-->
<template>
  <el-form-item :label="column.label" :prop="column.name" :rules="rules">
    <el-date-picker
      style="width: 320px"
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    >
    </el-date-picker>
  </el-form-item>
</template>
<script setup>
import { computed, ref } from "vue";
const emit = defineEmits(["update:data"]);

const props = defineProps({
  column: {
    type: [Object]
  },
  data: {
    type: Array
  }
});
const { column } = props;
const rules = ref([]);
const placeholder = column.placeholder ? column.placeholder : `请输入${column.label}`;
rules.value = [
  {
    required: column.required,
    message: placeholder,
    trigger: ["change"]
  }
];
const value = computed({
  get: function () {
    return props.data;
  },
  set: function (val) {
    emit("update:data", val);
  }
});
</script>
