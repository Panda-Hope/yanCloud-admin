<template>
  <div class="editor-wrapper">
    <div ref="container"></div>
  </div>
</template>

<script lang="ts" setup>
import Quill from 'quill'
import { ref, onMounted, defineProps, defineEmits, watch, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import 'quill/dist/quill.snow.css'
import { cosUpload } from '@/utils/index'

const props = defineProps({
  modelValue: { type: String, default: () => '' }
})
const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue'])
const container = ref<any>(null)

const initEditor = () => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    ['link', 'image', 'video'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }]
  ]
  const editor = new Quill(container.value, {
    theme: 'snow',
    modules: {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => imgHandler(editor)
        }
      }
    }
  })
  
  /* Image Uploader */
  const imgHandler = (editor: Quill) => {
    let input = editor.root.querySelector('input.ql-image[type=file]') as HTMLInputElement
    
    if (!input) {
      input = document.createElement('input');
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.classList.add('ql-image')
      input.addEventListener('change', () => {
        const files = input.files;
        const range = editor.getSelection(true)
        
        if (!files || !files.length) {
          ElMessage.error('请先选择图片')
          return;
        }
        
        editor.enable(false)
  
        const file = files[0]
        cosUpload(file)
            .then((res: any) => {
              editor.enable(true)
              editor.insertEmbed(range.index, 'image', res.Location)
              // @ts-ignore
              editor.setSelection(range.index + 1, Quill.sources.SILENT)
              input.value = ''
            })
            .catch((e: any) => {
              ElMessage(e.errMessage || e.errorMessage || '上传失败')
            })
            .finally(() => editor.enable(true))
      })
      editor.root.appendChild(input)
    }
    input.click()
  }
  
  // 监听父级内容变化
  watch(() => modelValue.value, () => {
    if (modelValue.value !== editor.root.innerHTML) {
      editor.root.innerHTML = modelValue?.value
    }
  })
  editor.setContents(modelValue as any)
  
  editor.on('text-change', () => {
    emits('update:modelValue', editor.root.innerHTML)
  })
}
onMounted(() => {
  initEditor()
})
</script>

<style lang="scss">
.editor-wrapper {
  position: relative;
  height: 400px;
  
  .ql-toolbar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  
  .ql-container {
    padding-top: 80px;
  }
}
</style>
