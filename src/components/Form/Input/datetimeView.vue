<!--日期格式类型-->
<template>
  <el-form-item :label="column.label" :prop="column.name" :rules="rules">
    <el-date-picker
      style="width: 100%"
      v-model="value"
      type="datetime"
      placeholder="选择日期"
      :format="column.format || 'YYYY-MM-DD HH:mm:ss'"
      :value-format="column.valueFormat || 'YYYY-MM-DDTHH:mm:ss'"
      :disabled-date="disabledDate"
      :readonly="column.readonly"
      :disabled="column.disabled"
    >
    </el-date-picker>
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
    type: String
  }
});
const { column } = props;
const rules = [
  {
    required: column.required,
    message: `请输入${column.label}`
  }
];

const disabledDate = time => {
  if (column?.disabledDate) {
    if (column.disabledDate == "beforeToday") {
      return time.getTime() > Date.now();
    } else if (column.disabledDate == "afterToday") {
      return time.getTime() < Date.now() - 86400000;
    } else {
      // console.log(Date.now());
      return time.getTime > Date(column.disabledDate);
    }
  } else {
    return;
  }
};
const value = computed({
  get: function () {
    return props.data;
  },
  set: function (val) {
    emit("update:data", val);
  }
});
</script>
