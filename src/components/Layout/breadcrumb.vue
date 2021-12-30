<template>
  <div class="page-nav">
    <div class="left">
      <el-icon class="page-icon" @click="setIsCollapse">
        <component :is="isCollapse ? 'Expand' : 'Fold'" />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
            v-for="(route, key) in matchedRoutes"
            :to="route.path"
            :key="key">{{ route?.meta?.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown placement="bottom-end">
        <div class="user-info">
          <el-avatar :size="24" :src="userInfo.userInfo.avatar">
            <el-icon><user-filled /></el-icon>
          </el-avatar>
          <span>{{ userInfo.userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button type="text" @click="goUserHome">个人中心</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import setupState from './setup/menuState'
import setupNav from './setup/nav'
import './index.scss'

const {
  userInfo,
  isCollapse,
  setIsCollapse
} = setupState()

const matchedRoutes = setupNav()
const router = useRouter()
const goUserHome = () => router.push({ name: "userPersonal" })
</script>
