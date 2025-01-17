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
      title: "栏目名称"
    },
    {
      name: "total",
      type: "number",
      title: "栏目数量",
      required: true
    },
    {
      name: "count",
      type: "number",
      title: "浏览数量"
    },
    {
      name: "content",
      type: "textarea",
      title: "内容"
    },
    {
      name: "startDate",
      type: "date",
      title: "开始日期",
      required: true
    },
    {
      name: "endDate",
      type: "date",
      title: "结束日期"
    },
    {
      name: "isValid",
      type: "switch",
      title: "是否有效"
    },
    {
      name: "isExpired",
      type: "switch",
      title: "是否过期",
      required: true
    }
  ]
});
</script>
