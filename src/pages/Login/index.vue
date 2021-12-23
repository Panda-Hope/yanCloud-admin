<template>
  <div class="login-page">
    <el-button type="primary" @click="onLogin">登陆</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onLogin = () => router.push('/home')
</script>


<style lang="scss">
.login-page {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
