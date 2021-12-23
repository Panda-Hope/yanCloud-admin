<template>
  <el-skeleton
      animated
      :throttle="300"
      loading="loading">
  </el-skeleton>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const { loading } = defineProps({ loading: Boolean })
</script>
