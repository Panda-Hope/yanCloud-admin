<template>
  <div class="authority-page">
    <el-form inline>
      <el-form-item label="权限名称：">
        <el-select v-model="name">
          <el-option
              v-for="(i, k) in apps"
              :key="k"
              :label="i.name"
              :value="i.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="page-content">
      <el-tree
          v-loading="loading"
          :expand-on-click-node="false"
          :data="treeData"
          default-expand-all>
        <template #default="{ node, data }">
          <el-form class="tree-node" inline>
            <el-form-item>
              <el-checkbox></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-input v-model="data.name" placeholder="权限名称"></el-input>
            </el-form-item>
            <el-form-item class="expression">
              <el-input v-model="data.expression" placeholder="权限表达式"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="data.permissionType">
                <el-option
                    v-for="(i, k) in authorityTypeMap"
                    :label="i"
                    :value="k"
                    :key="k">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="actions">
                <el-link type="primary" :underline="false" @click="() => onAdd(node)">
                  <el-icon><CirclePlusFilled /></el-icon>
                </el-link>
                <el-link type="danger" :underline="false" @click="() => disable(data)">
                  <el-icon><RemoveFilled /></el-icon>
                </el-link>
                <el-link
                    type="success"
                    :disabled="editing"
                    :underline="false"
                    @click="() => onEdit(data)">
                  <el-icon><SuccessFilled /></el-icon>
                </el-link>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Delete,
  Search,
  RemoveFilled,
  SuccessFilled
} from '@element-plus/icons'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  disablePermission,
  getPermissionTree,
  editPermission,
  getApps
} from '@/api'
import {
  AuthorityType,
  AuthorityTypeMap
} from '@/consts'

const authorityTypeMap = AuthorityTypeMap

// 应用列表
const name = ref('')
const apps = ref([])
const getAdminApps = async () => {
  const res = await getApps()
  if (res.success) {
    const result = res.data.find(i => i.type === 'AppName')
    if (result) {
      apps.value = result.items
      name.value = result.items[1].value

      onSearch()
    } else {
      apps.value = []
    }
  }
}
getAdminApps()

const loading = ref(false)
const treeData = ref<any[]>([])
const onSearch = async () => {
  loading.value = true
  const res = await getPermissionTree({ appName: name.value })

  if (res.success) {
    treeData.value = res.data
    loading.value = false
  }
}

// 编辑权限
const editing = ref(false)
const onEdit = async (data: any) => {
  editing.value = true
  const res = await editPermission({
    id: data.id,
    appName: data.appName,
    expression: data.expression,
    permissionType: data.permissionType
  })
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    editing.value = false
    onSearch()
  }
}

// 删除权限
const disable = async (data: any) => {
  const check = await ElMessageBox.confirm(`确定要删除“${data.name}”权限吗？`, '警告', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定'
  })
  if (!check) return

  const res = await disablePermission({id: data.id})
  if (res.success) {
    onSearch()
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }
}

// 添加权限
const onAdd = (node) => {
  const emptyNode = {
    appName: name.value,
    expression: '',
    httpMethod: '',
    name: '',
    permissionType: AuthorityType.Menu
  }
  console.log(node)
}
</script>

<style lang="scss">
.authority-page {
  .el-tree-node__content {
    height: auto;
    padding-bottom: 5px;
    padding-top: 5px;
  }

  .tree-node {
    display: flex;

    > .el-form-item {
      margin-bottom: 0;
    }

    .expression {
      .el-input {
        width: 380px;
      }
    }

    .actions {
      display: flex;

      > .el-link {
        margin-right: 5px;
      }
    }
  }
}
</style>