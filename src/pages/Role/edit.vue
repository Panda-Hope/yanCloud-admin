<template>
  <div class="create-role-page">
    <el-form class="actions">
      <el-form-item>
        <el-button
            type="primary"
            :disabled="checkedPermissionList.length === 0 || saving"
            :icon="Check"
            @click="onSave">保存
        </el-button>
      </el-form-item>
    </el-form>
    <PageHeader></PageHeader>

    <el-tabs v-model="tabName" @tab-click="onLoadData">
      <el-tab-pane v-for="(i, k) in apps" :key="k" :label="i.name" :name="i.value">
        <el-checkbox-group v-model="checkedPermissionList">
          <el-tree
              v-loading="loadingTree"
              :data="treeData"
              default-expand-all>
            <template #default="{ node, data }">
              <el-checkbox :label="data.id">{{data.name}}</el-checkbox>
            </template>
          </el-tree>
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons'
import PageHeader from '@/components/PageHeader/index.vue'
import {
  getApps,
  editPermission,
  getPermissionTree,
  queryRolePermissions
} from '@/api'

// 加载面板数据
const tabName = ref('')
const checkedPermissionList = ref<string[]>([])
const loadingTree = ref(false)
const treeData = ref<any[]>([])
const onLoadData = async () => {
  loadingTree.value = true
  const res = await getPermissionTree({ appName: tabName.value })
  if (res.success) {
    treeData.value = res.data
    loadingTree.value = false
  }
}

// 加载应用数据
const apps = ref<any[]>([])
const getAdminApps = async () => {
  const res = await getApps()
  if (res.success) {
    const result = res.data.find(i => i.type === 'AppName')
    apps.value = result ? result.items : []

    // 首次加载权限树
    tabName.value = apps.value[0]?.value
    onLoadData()
  }
}
getAdminApps()

// 保存数据
const saving = ref(false)
const route = useRoute()
const router = useRouter()
const onSave = async () => {
  saving.value = true

  const { id } = route.params
  const res = await editPermission({
    permissionIds: checkedPermissionList.value,
    roleId: Number(id)
  })

  if (res.success) {
    ElMessage({
      type: 'success',
      message: '修改成功',
      onClose: () => router.push('/role')
    })
  }
}

// 初始化权限列表
const getPermissions = async () => {
  const { id } = route.params
  const res = await queryRolePermissions({roleId: id})

  if (res.success) {
    checkedPermissionList.value = res.data
    checkedPermissionList.value = res.data.map(i => i.id)
  }
}
getPermissions()
</script>

<style lang="scss">
.create-role-page {
 > .actions {
   float: right;
 }
}
</style>