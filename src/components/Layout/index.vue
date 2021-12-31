<template>
  <div class="page-container">
    <el-menu
        ref="sidebar"
        :default-active="defaultActive"
        :collapse="isCollapse"
        :collapse-transition="false"
        class="page-menu">
      <el-scrollbar height="100%">
        <el-menu-item class="flex align-center">
          <el-avatar :size="isCollapse ? 24 : 32" :src="PaiMeng"></el-avatar>
          <template #title><span class="ml-15">派蒙</span></template>
        </el-menu-item>
        <template v-for="(menu, index) in menus">
          <template v-if="!menu.children">
            <el-menu-item
                v-if="menu.meta && !menu.meta.hidden"
                :key="index"
                :index="`${index}`"
                @click="() => onMenuClick(menu.path)">
              <el-icon v-if="menu.meta && menu.meta.icon">
                <el-badge :max="99" :value="menu.meta?.badge" :hidden="!menu.meta?.badge || menu.meta?.badge<=0">
                  <component :is="menu.meta.icon" />
                </el-badge>
              </el-icon>
              <template #title>{{ menu.meta ? menu.meta.title : '' }}</template>
            </el-menu-item>
          </template>
          <el-sub-menu v-else :index="`${index}`" :key="`${index}-n`">
            <template #title>
              <el-icon v-if="menu.meta && menu.meta.icon">
                <el-badge :max="99" :value="menu.meta?.badge" :hidden="!menu.meta?.badge || menu.meta?.badge<=0">
                  <component :is="menu.meta.icon" />
                </el-badge>
              </el-icon>
              <span>{{ menu.meta ? menu.meta.title : '' }}</span>
            </template>
            <template v-for="(subMenu, subIndex) in menu.children">
              <template v-if="!subMenu.children">
                <el-menu-item
                    v-if="subMenu.meta && !subMenu.meta.hidden"
                    @click="() => onMenuClick(`${menu.path}/${subMenu.path}`)"
                    :index="`${index}-${subIndex}`"
                    :key="`${index}-${subIndex}`">
                  <el-icon v-if="subMenu.meta && subMenu.meta.icon">
                    <el-badge :max="99" :value="subMenu.meta?.badge" :hidden="!subMenu.meta?.badge || subMenu.meta?.badge<=0">
                      <component :is="subMenu.meta.icon" />
                    </el-badge>
                  </el-icon>
                  <template #title>{{ subMenu.meta ? subMenu.meta.title : '' }}</template>
                </el-menu-item>
              </template>
              <el-sub-menu :index="`${index}-${subIndex}`" v-else>
                <template #title>
                  <el-icon v-if="subMenu.meta && subMenu.meta.icon">
                    <el-badge :max="99" :value="subMenu.meta?.badge" :hidden="!subMenu.meta?.badge || subMenu.meta?.badge<=0">
                      <component :is="subMenu.meta.icon" />
                    </el-badge>
                  </el-icon>
                  <span>{{ subMenu.meta ? subMenu.meta.title : '' }}</span>
                </template>
                <template v-for="(thirdMenu, thirdIndex) in subMenu.children">
                  <el-menu-item
                      v-if="thirdMenu.meta && !thirdMenu.meta.hidden"
                      :key="`${index}-${subIndex}-${thirdIndex}`"
                      :index="`${index}-${subIndex}-${thirdIndex}`"
                      @click="() => onMenuClick(`${menu.path}/${subMenu.path}/${thirdMenu.path}`)">
                    <el-icon v-if="thirdMenu.meta && thirdMenu.meta.icon">
                      <el-badge :max="99" :value="thirdMenu.meta?.badge" :hidden="!thirdMenu.meta?.badge || thirdMenu.meta?.badge<=0">
                        <component :is="thirdMenu.meta.icon" />
                      </el-badge>
                    </el-icon>
                    <template #title>{{ thirdMenu.meta ? thirdMenu.meta.title : '' }}</template>
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
          </el-sub-menu>
        </template>
      </el-scrollbar>
    </el-menu>
    <div class="page-body" :style="{paddingLeft: `${contentPadding}px`}">
      <NavBreadCrumb></NavBreadCrumb>
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'

import PaiMeng from '@/assets/paimeng.jpg'
import NavBreadCrumb from './breadcrumb.vue'
import './index.scss'


const store = useStore()
const router = useRouter()

const sidebar = ref<any>(null)
const isCollapse = computed(() => store.getters.getIsCollapse)
const contentPadding = computed(() => store.getters.getIsCollapse ? 80 : 200 )
const menus = computed(() => store.getters.getMenu)
const defaultActive = computed(() => {
  const [, ...matchedRoutes] = useRoute().matched // remove root route
  let nodeRoue = menus.value
  let activeIndex = ''
  
  matchedRoutes.forEach(r => {
    const index = nodeRoue.findIndex((i: RouteRecordRaw) => i.name === r.name)
   
    if (index > -1) {
      activeIndex += `${index}-`
      if (nodeRoue[index].children && nodeRoue[index].children.length) nodeRoue = nodeRoue[index].children
    }
  })
  return activeIndex.slice(0, activeIndex.length - 1)
})

// 强制刷新Menu
watch(() => store.getters.refresh, () => {
  if (sidebar) sidebar.value?.$forceUpdate()
})

const onMenuClick = (path: string) => router.push(`/${path}`)
</script>
