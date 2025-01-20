<!--字典颜色选择-->
<template>
  <el-form-item :label="props.column.label" :prop="props.column.name" :rules="state.rules">
    <div class="color-banner">
      <div class="demo-color-block">
        <el-input disabled v-model="value" />
        <el-color-picker v-model="color" @change="changColorClick" />
      </div>
    </div>
  </el-form-item>
</template>
<script setup>
import { reactive, ref, computed } from "vue";

const emit = defineEmits(["update:data"]);
const props = defineProps({
  column: {
    type: [Object]
  },
  data: {
    type: String
  }
});

const color = ref("");
const state = reactive({
  rules: [],
  colorFont: ""
});

state.rules = [
  {
    required: props.column.required,
    message: `请输入${props.column.label}`,
    trigger: ["blur", "change"]
  }
];

const changColorClick = () => {
  state.colorFont = color.value;
  console.log(state.colorFont, "++++++++");
  emit("update:data", state.colorFont);
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

<style lang="scss" scoped>
.color-banner {
  display: flex;
  justify-content: space-between;
}
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.demo-color-block .demonstration {
  margin-right: 16px;
}
.color-nav {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-right: 66px;
}
</style>
