<!--switch切换本身就有值，可以考虑不进行判断必填项-->
<template>
  <el-form-item :label="column.label" :prop="column.name">
    {{ placeholder?.[0] || "" }} &nbsp;<el-switch
      v-model="value"
      :active-value="getValueType(column.valueType ?? 'boole', 'active')"
      :inactive-value="getValueType(column.valueType ?? 'boole', 'inactive')"
      @change="onChangeSwitch"
    />
    &nbsp; {{ placeholder?.[1] || "" }}
    <component :is="column.suffixComponent" v-model:form-data="formData" v-if="column.suffixComponent"></component>
  </el-form-item>
</template>
<script setup>
import { computed, toRefs } from "vue";
const emits = defineEmits(["update:data"]);
const props = defineProps({
  column: {
    type: [Object]
  },
  data: {
    type: [String, Boolean]
  },
  formData: {
    type: [Object]
  }
});

const { column, formData } = toRefs(props);
const { placeholder } = column;
// const rules = [
//   {
//     required: column.value.required,
//     message: `请输入${column.value.label}`
//   }
// ];

const enumerateType = new Map([
  ["whether", ["是", "否"]],
  ["boole", [true, false]]
]);

const onChangeSwitch = val => {
  if (props.column.changeFunction) {
    props.column.changeFunction(val);
  }
};

const value = computed({
  get: function () {
    return props.data || placeholder?.[0];
  },
  set: function (val) {
    emits("update:data", val);
  }
});

const getValueType = computed(() => {
  return function (valueType, activeType) {
    if (activeType === "active") {
      return enumerateType.get(valueType)[0];
    } else if (activeType === "inactive") {
      return enumerateType.get(valueType)[1];
    } else {
      return "";
    }
  };
});
</script>
