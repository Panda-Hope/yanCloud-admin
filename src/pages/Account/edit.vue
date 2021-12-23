<template>
  <div class="edit-account-page">
    <PageHeader></PageHeader>

    <el-form :model="formData" label-width="100px" ref="form">
      <el-form-item label="姓名：">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="头像：">
        <Uploader v-model="formData.avatar"></Uploader>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="formData.contactPhone"></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱：">
        <el-input v-model="formData.contactMail"></el-input>
      </el-form-item>
      <el-form-item label="是否禁用：">
        <el-radio v-model="formData.disable" :label="false">使用中</el-radio>
        <el-radio v-model="formData.disable" :label="true">已禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PageHeader from '@/components/PageHeader/index.vue'
import Uploader from '@/components/Uploader/index.vue'
import {
  queryAccountInfo,
  editAccountInfo,
  getAccountRole
} from '@/api'

const route = useRoute()
const router = useRouter()
const formData = ref<any>({})
const form = ref<any>(null)

// 获取账户信息
const getAccountInfo = async () => {
  const { id } = route.params
  if (!id) return

  const res = await queryAccountInfo({accountId: Number(id)})
  if (res.success) {
    formData.value = res.data
  }
}
getAccountInfo()

// 获取账户角色信息
const roleLists = ref<any[]>([])
const getRoleInfo = async () => {
  const res = await getAccountRole({page: 0, size: 1000})
  if (res.success) {
    roleLists.value = res.data
  }
}
getRoleInfo()

const onSave = async () => {
  const check = await form.value.validate()
  if (!check) return

  const {
    name,
    avatar,
    username,
    contactPhone,
    contactMail,
    disable
  } = formData.value
  const res = await editAccountInfo({
    accountId: Number(route.params.id),
    name,
    avatar,
    username,
    contactPhone,
    contactMail,
    disable
  })

  if (res.success) {
    ElMessage({
      type: 'success',
      message: '修改成功',
      onClose: () => router.push('/account')
    })
  }
}
</script>

<style lang="scss">
.edit-account-page {
  > .el-form {
    max-width: 800px;
  }
}
</style>