<!--简单文本框-->
<template>
  <el-form-item :label="column.label" :prop="column.name" :rules="rules">
    <el-input
      v-model="value"
      type="textarea"
      :placeholder="placeholder"
      :rows="column.rows"
      :maxlength="column.maxlength"
      :minlength="column.minlength"
      :show-word-limit="column.showwordlimit"
      :autosize="column.autosize"
      :disabled="!!props.column.disabled"
    />
  </el-form-item>
</template>

<script lang="ts" setup name="TextAreaView">
import { computed, ref, toRefs } from "vue";
import { FormModule } from "@/typings/form";

const emit = defineEmits(["update:data"]);
interface TextAreaProps {
  column: FormModule.FormTextAreaColumn;
  formData: any;
  data?: string;
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  data: undefined
});

const { column } = toRefs(props);
if (column.value && !column.value.rows) {
  column.value.rows = 3;
}

const rules = ref<FormModule.FormColumnRule[]>([]);
const placeholder = column.value.placeholder ? column.value.placeholder : `请输入${column.value.label}`;

rules.value = [
  {
    required: column.value.required,
    message: placeholder,
    trigger: ["blur", "change"]
  }
];

if (column.value && column.value.rules) {
  rules.value = [...rules.value, ...column.value.rules];
}

const value = computed({
  get: function () {
    return props.data;
  },
  set: function (val) {
    emit("update:data", val);
  }
});
</script>
