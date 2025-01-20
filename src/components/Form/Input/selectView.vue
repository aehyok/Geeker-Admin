<!--简单文本框-->
<template>
  <el-form-item :label="props.column.label" :prop="column.name" :rules="rules">
    <el-select v-model="value" style="width: 100%">
      <!-- @filter-method ="filterMethod" -->
      <!-- <el-option v-if="!column.readonly && !column.disabled" -->
      <el-option
        v-for="item in dictionaryList"
        :key="item.code"
        :disabled="item.disabled || item.readOnly"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
      <template v-if="props.column.prefix" #prefix>
        <el-tag class="ml-2" effect="dark" type="success">{{ props.column.prefix }}</el-tag>
      </template>
    </el-select>
    <div v-if="column.remark" style="font-size: 12px">
      {{ column.remark }}
    </div>
  </el-form-item>
</template>
<script setup>
import { computed, ref, watch, unref } from "vue";

const PLog = function () {
  // console.log('selectView:: ', ...arguments);
};

const dictionaryList = ref([]);
const emit = defineEmits(["update:data"]);
const props = defineProps({
  column: {
    type: [Object]
  },
  data: {
    type: [Number, String, Array, Boolean]
  }
});

const { column } = props;

let { dictionary } = props.column;
PLog("column", column);

const rules = ref([]);
const placeholder = column.placeholder ? column.placeholder : `请选择${column.label}`;
rules.value = [
  {
    required: column.required,
    message: placeholder,
    trigger: "change, blur"
  }
];

if (column && column.rules) {
  console.log(column.rules, "column.rules-----------");
  rules.value = [...rules.value, ...column.rules];
}

const value = computed({
  get: function () {
    return props.data;
  },
  set: function (val) {
    emit("update:data", val);
  }
});

watch(value, () => {
  changeSelectClick(unref(value));
});

const setChangeSelectValue = value => {
  if (!value && value !== 0) {
    return "";
  }
  console.log(!dictionary.value?.length, "createValue" in column);
  // 判断 dictionary长度为0 且 createValue 存在 ， 返回默认值createValue
  if (!dictionaryList.value?.length && "createValue" in column) {
    return column.createValue;
  }

  // dictionary中 是否 存在value
  if (dictionaryList.value?.length && "createValue" in column) {
    const getChangeDictionaryItem = dictionaryList.value.find(res => res.code === value);
    if (getChangeDictionaryItem) return getChangeDictionaryItem.code;
    else return column.createValue;
  }

  return value;
};

const changeSelectClick = value => {
  let item = setChangeSelectValue(value);

  if (props.column && props.column.changeFunction) {
    props.column.changeFunction(item);
  }
};

watch(
  () => props.column.dictionary,
  newValue => {
    console.log(props.column.dictionary, "props.column.dictionary");
    if (typeof dictionary === "object" && dictionary.constructor === Array) {
      dictionaryList.value = newValue;
    }
  },
  {
    immediate: true,
    deep: true
  }
);

// const clearClick = () => {
//   if (props.column && props.column.changeFunction) {
//     props.column.changeFunction(0);
//   }
// };

// const { componentPropsAttrs, formItemPropsAttrs } = componentsPropsConfig({
//   props,
//   otherComProps: {
//     // onChange: changeSelectClick,
//     onClear: clearClick,
//     disabled: props.column.disabled || props.column.readonly,
//     filterable: column.filterable,
//     multiple: column.multiple,
//     placeholder,
//     remote: column.remote,
//     remoteMethod: column.remoteMethod,
//     clearable: Object.hasOwnProperty.call(column, "clearable") ? column.clearable : true,
//     "allow-create": column.allowCreate
//   }
// });
</script>
