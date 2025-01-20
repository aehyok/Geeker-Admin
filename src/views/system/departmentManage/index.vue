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
      type: "datetime",
      label: "结束日期"
    },
    {
      name: "endssDate",
      type: "daterange",
      label: "起始时间"
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
    },
    {
      name: "radio1",
      type: "radio",
      label: "是否同意",
      required: true,
      dictionaryList: [
        {
          code: 1,
          name: "是"
        },
        {
          code: 2,
          name: "否"
        }
      ]
    },
    {
      name: "checkbox1",
      type: "checkbox",
      label: "check的选项",
      required: true,
      dictionaryList: [
        {
          code: 1,
          name: "同意1"
        },
        {
          code: 2,
          name: "同意2"
        },
        {
          code: 3,
          name: "同意3"
        }
      ]
    },
    {
      name: "select1",
      type: "select",
      label: "select同意的选项",
      required: true,
      dictionary: [
        {
          code: 1,
          name: "同意1"
        },
        {
          code: 2,
          name: "同意2"
        },
        {
          code: 3,
          name: "同意3"
        }
      ]
    }
  ]
});
</script>
