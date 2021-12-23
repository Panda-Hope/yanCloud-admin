<template>
  <div class="role-page">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="showDialog = true">新建角色</el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="showDialog" title="新建角色">
      <el-form label-width="100px" :model="roleForm" ref="roleFormRef">
        <el-form-item prop="role" label="角色名称：" required>
          <el-input v-model="roleForm.role" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述：">
          <el-input v-model="roleForm.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="onCreateRole">创建</el-button>
      </template>
    </el-dialog>

    <el-table :data="roleDta" v-loading="loading">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button type="primary" @click="() => goEdit(scope.row)">修改角色</el-button>
          <el-button type="danger" @click="() => delRole(scope.row)">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getRoleLists, createRole, forbiddenRole } from '@/api'

// 加载角色列表数据
const roleDta = ref<any>([])
const loading = ref(false)

const getTableData = async () => {
  loading.value = true

  const res = await getRoleLists()
  if (res.success) {
    roleDta.value = res.data
    loading.value = false
  }
}
getTableData()

// 去编辑页面
const router = useRouter()
const goEdit = (data) => router.push(`/editRole/${data.id}`)

// 创建角色弹窗
const showDialog = ref(false)
const roleFormRef = ref<any>(null)
const roleForm = ref({
  role: '', // 角色名称
  description: '' // 描述信息
})
const onCreateRole = async () => {
  if (!roleFormRef.value) return

  const check = await roleFormRef.value.validate()
  if (!check) return

  const res = await createRole(roleForm.value)
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '角色创建成功'
    })
    showDialog.value = false
    getTableData()
  }
}

// 删除角色
const delRole = async (data: any) => {
  const check = await ElMessageBox.confirm('确定要删除此角色吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  if (!check) return

  const res = await forbiddenRole({id: data.id})
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '角色删除成功'
    })
    getTableData()
  }
}
</script>

<style lang="scss">
.role-page {

}
</style>