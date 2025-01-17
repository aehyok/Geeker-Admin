<template>
  <el-form :model="formData" label-width="auto" ref="formRef">
    <sl-form :column-list="state.columns" :form-data="formData" />
  </el-form>
</template>

<script setup lang="ts" name="departmentManage">
import { ref, reactive } from "vue";
import SlForm from "@/components/Form/index.vue";

const formData = ref({});

const state = reactive({
  columns: [
    {
      name: "name",
      type: "text",
      label: "栏目名称"
    },
    {
      name: "total",
      type: "number",
      label: "栏目数量",
      required: true
    },
    {
      name: "count",
      type: "number",
      label: "浏览数量"
    },
    {
      name: "content",
      type: "textarea",
      label: "内容"
    },
    {
      name: "startDate",
      type: "date",
      label: "开始日期",
      required: true
    },
    {
      name: "endDate",
      type: "date",
      label: "结束日期"
    },
    {
      name: "isValid",
      type: "switch",
      label: "是否有效"
    },
    {
      name: "isExpired",
      type: "switch",
      label: "是否过期",
      required: true
    }
  ]
});
</script>
