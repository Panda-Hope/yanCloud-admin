<template>
  <el-form inline>
    <el-form-item label="名称：" prop="name" :model="formData">
      <el-input v-model="formData.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="下拉框：" prop="select">
      <el-select v-model="formData.select"></el-select>
    </el-form-item>
    <el-form-item label="日期：" prop="date">
      <el-date-picker v-model="formData.date"></el-date-picker>
    </el-form-item>
  </el-form>

  <el-table>
    <el-table-column label="ID"></el-table-column>
    <el-table-column label="名称"></el-table-column>
    <el-table-column label="日期"></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  select: '',
  date: ''
})
</script>