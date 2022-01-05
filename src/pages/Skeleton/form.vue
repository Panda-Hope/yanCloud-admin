<template>
  <SkeletonForm :loading="loading">
    <template>
      <el-form>
        <el-form-item label="姓名：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SkeletonForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SkeletonForm from '@/components/Skeleton/form.vue'

const loading = ref(true)
</script>