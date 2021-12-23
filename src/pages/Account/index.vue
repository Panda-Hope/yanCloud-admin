<template>
  <div class="account-page">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="goCreate">创建账户</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="data">
      <el-table-column label="账户ID" prop="accountId"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="账户类型" prop="accountType"></el-table-column>
      <el-table-column label="用户头像" prop="avatar">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" prop="address"></el-table-column>
      <el-table-column label="城市" prop="city"></el-table-column>
      <el-table-column label="联系邮箱" prop="contactMail"></el-table-column>
      <el-table-column label="联系电话" prop="contactPhone"></el-table-column>
      <el-table-column label="国家" prop="country"></el-table-column>
      <el-table-column width="160" label="上次登录时间" prop="lastLoginTime">
        <template #default="scope">
          <span>{{ dayjs(scope.row.lastLoginTime).format('YYYY-MM-DD HH:MM') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" prop="birthday" width="160">
        <template #default="scope">
          <span>{{ dayjs(scope.row.birthday).format('YYYY-MM-DD HH:MM') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created" width="160">
        <template #default="scope">
          <span>{{ dayjs(scope.row.created).format('YYYY-MM-DD HH:MM') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否已注销" prop="cancelled">
        <template #default="scope">
          <el-link :type="scope.row.cancelled ? 'danger' : 'success'" :underline="false">
            {{ scope.row.cancelled ? '是' : '否' }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="是否已禁用" prop="disable">
        <template #default="scope">
          <el-link :type="scope.row.disable ? 'danger' : 'success'" :underline="false">
            {{ scope.row.disable ? '是' : '否' }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template #default="scope">
          <el-button type="primary" @click="() => goEdit(scope.row.accountId)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pagination"
        v-model:currentPage="pagination.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.size"
        layout="sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { queryAccounts } from '@/api'

const data = ref<any[]>([])
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})
const loading = ref(false)
const getTableData = async () => {
  loading.value = true
  const res = await queryAccounts({
    page: pagination.page -1,
    size: pagination.size
  })
  if (res.success) {
    data.value = res.data.content
    pagination.total = res.data.total
    loading.value = false
  }
}
const onSearch = () => {
  pagination.page = 1
  getTableData()
}
const handleSizeChange = (size) => {
  pagination.size = size
  pagination.page = 1
  getTableData()
}
const handleCurrentChange = (page) => {
  pagination.page = page
  getTableData()
}
onSearch()

const router = useRouter()
const goEdit = id => router.push(`/account/${id}`)
const goCreate = () => router.push('/addAccount')
</script>

<style lang="scss">
.account-page {

}
</style>