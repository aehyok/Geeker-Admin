<template>
  <el-form-item
    :label="props.column.label"
    :prop="props.column.name"
    :rules="props.column.rules"
    :required="props.column.required"
  >
    <el-input
      v-model="value"
      :name="props.column.name"
      :placeholder="placeholder"
      :maxlength="props.column.maxlength"
      :show-word-limit="props.column.showwordlimit"
      clearable
      :disabled="props.column.disable"
      :readonly="props.column.readonly"
      :size="props.column.size"
    ></el-input>
  </el-form-item>
</template>
<script setup lang="ts">
import { FormModule } from "@/typings/form";
import { computed, ref } from "vue";
const emit = defineEmits(["update:data", "search-name"]);

interface TextProps {
  column: FormModule.FormTextColumn;
  data?: string | number | Object;
  labelWidth?: string;
  formData: Record<string, any>;
}

const props = withDefaults(defineProps<TextProps>(), {
  data: undefined
});

const value: any = computed({
  get: function () {
    return props.data;
  },
  set: function (val) {
    emit("update:data", val);
  }
});

const rules = ref<any>([]);
console.log(props, "textView");
const placeholder = props.column.placeholder ? props.column.placeholder : `请输入${props.column.label}`;

rules.value = [
  {
    required: props.column.required,
    message: placeholder,
    trigger: ["blur", "change"]
  }
];

console.log("text");
</script>
