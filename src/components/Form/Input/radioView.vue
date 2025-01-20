<!--radio 单选框-->
<template>
  <el-form-item :label="column.label" :prop="column.name" :rules="rules">
    <el-radio-group v-model="value" @change="radioChange">
      <el-radio v-for="item in column.dictionaryList" :value="item.code" :key="item.code" :disabled="!!props.column.disabled">
        {{ item.name }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:data"]);
const props = defineProps({
  column: {
    type: [Object]
  },
  formData: {
    type: [Object]
  },
  data: {
    type: [Number, String, Boolean],
    default: undefined
  }
});
const { column } = props;

const rules = [
  {
    // 加上双？？，防止出现选中后提示请选择"this.column.label"
    required: column.required ?? false,
    message: `请选择${column.label}`,
    trigger: "change"
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

// radio change事件去切换控制其他组件，或者其他几个组件（先考虑控制一个）
// 要通过一个字段控制，如果是这个字段，则可以进行控制切换状态
const radioChange = e => {
  console.log(e, column, "this.radioChange");
  // emit('update:data', val)
};
</script>
<style scoped>
.el-radio-group {
  vertical-align: baseline;
}
</style>
