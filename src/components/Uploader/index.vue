<template>
  <el-upload
      drag
      action=""
      :accept="accept"
      class="uploader"
      v-loading="loading"
      :on-change="onChange"
      :show-file-list="false"
      :auto-upload="false">
    <template
        v-for="(i, k) in [modelValue]"
        v-if="modelValue"
        :src="i"
        :key="k"
        class="img">
      <img v-if="assetType === AssetType.Image" :src="i" />
      <video v-else-if="assetType === AssetType.Video">
        <source :src="i" />
      </video>
      <audio v-else>
        <source :src="i" />
      </audio>
      <el-icon @click.stop="onClose" class="close" size="18px"><Close /></el-icon>
    </template>
    <el-icon size="40px" v-else><plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  reactive,
  defineProps,
  defineEmits
} from 'vue'
import { ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons'

enum AssetType {
  Image = 0,
  Audio,
  Video
}

const { modelValue, accept, maxSize } = defineProps({ accept: String, modelValue: String, maxSize: Number })
const emits = defineEmits(['update:modelValue'])

const loading = ref(false)
const assetType = computed(() => {
  if (!accept) return AssetType.Image
  if (accept.indexOf('video') > -1) return AssetType.Video
  if (accept.indexOf('audio') > -1) return AssetType.Audio
  
  return AssetType.Image
})

const onChange = async (file: any) => {
  if (maxSize && file.size > maxSize) {
    return ElMessage.error(`上传文件大小不能超过${Math.floor(maxSize/1024)}M`)
  }
}
const onClose = () => {
  emits('update:modelValue', '')
}
</script>

<style lang="scss">
.uploader {
  .el-upload {
    position: relative;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    max-width: 100%;
    max-height: 100%;
  
    .el-upload-dragger {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  
    img, video, audio {
      display: inline-block;
      max-width: 100%;
      width: 100%;
      height: 100%;
    }
    
    .close {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--el-color-white);
      border-radius: 0 0 0 6px;
    }
  }
}
</style>
