<template>
  <div class="page-header">
    <el-button :icon="Back" type="primary" @click="goBack">返回</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons'

const { path } = defineProps({ path: String })
const router = useRouter()

const goBack = () => {
  if (path) {
    router.push(path)
  } else {
    router.go(-1)
  }
}
</script>

<style lang="scss">
.page-header {
  margin-bottom: 20px;
}
</style>
