<template>
  <el-skeleton
      :loading="loading"
      :count="count"
      animated
      throttle="500">
    <template #template>
      <div class="skeleton-form">
        <div class="form-item first">
          <el-skeleton-item variant="text"></el-skeleton-item>
          <el-skeleton-item variant="h1"></el-skeleton-item>
        </div>
        <div class="form-item">
          <el-skeleton-item variant="text"></el-skeleton-item>
          <el-skeleton-item variant="h1"></el-skeleton-item>
        </div>
        <div class="form-item last">
          <el-skeleton-item variant="text"></el-skeleton-item>
          <el-skeleton-item variant="h1"></el-skeleton-item>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
const { loading, count } = withDefaults(defineProps<{
  loading: boolean,
  count: number
}>(), {
  loading: true,
  count: 3
})
</script>

<style lang="scss">
.skeleton-form {
  &:not(:first-child) {
    margin-top: 10px;
  }

  > .form-item {
    display: flex;

    &:not(:first-child) {
      margin-top: 10px;
    }

    > .el-skeleton__item {
      height: 32px;

      &:not(:first-child) {
        margin-left: 12px;
      }
    }

    > .el-skeleton__text {
      width: 120px;
      flex-shrink: 0;
    }

    &.first {
      .el-skeleton__h1 {
        width: 50%;
      }
    }

    &.last {
      .el-skeleton__h1 {
        width: 70%;
      }
    }
  }
}
</style>
