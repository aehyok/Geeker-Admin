<!--number数值类型-->
<template>
  <el-form-item v-model:label="column.label" :prop="column.name" :rules="rules">
    <el-input
      type="number"
      v-model.number="value"
      :controls="controls"
      :precision="column.precision"
      :style="{ width: column.width || '100%', 'text-align': 'left' }"
      :placeholder="placeholder"
      :readonly="props.column.readonly"
      :disabled="props.column.disabled || props.column.readonly"
      :size="props.column.size"
      @input="inputFun"
      :max="column.max"
      :min="column.min"
    >
      <template #suffix v-if="column.append">
        <div class="append-class">
          <span>{{ column.append }}</span>
        </div>
      </template>
    </el-input>
    <div v-if="column.remark">
      {{ column.remark }}
    </div>
  </el-form-item>
</template>
<script setup>
import { computed, watch, ref } from "vue";

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
const rules = ref([
  {
    required: !!column.required,
    message: `请输入${column.label}`,
    trigger: "blur"
  }
]);

const inputFun = e => {
  props.column.inputFunction && props.column.inputFunction(e);
};

const controls = column.controls ?? false;
const placeholder = column.placeholder ? column.placeholder : `请输入${column.label}`;
const value = computed({
  get: function () {
    return column.precision ? typeof props.data == "number" && parseFloat(props.data?.toFixed(column.precision)) : props.data;
  },
  set: function (val) {
    if (column.precision || column.precision === 0) {
      emit("update:data", val ? parseFloat(val.toFixed(column.precision)) : 0);
    } else {
      emit("update:data", val);
    }
  }
});

watch(
  () => props.data,
  () => {
    if (column.changefunction) {
      try {
        const evalFunction = eval(column.changefunction);
        evalFunction(props.formData, column);
      } catch (e) {
        console.log("changefunction number error!!!", e);
      }
    }
  },
  {
    immediate: true
  }
);
</script>
<style lang="scss" scoped>
:deep(.el-input-number.is-without-controls .el-input__inner) {
  text-align: left;
}
</style>
