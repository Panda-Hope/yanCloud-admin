import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: process.env.NODE_ENV === 'production' ? '/admin/account/page/' : './',
  build: {
    cssCodeSplit: true,
    sourcemap: true
  },
  server: {
    proxy: {
      '^/admin/parasol/api': {
        target: 'https://gensci-dev.xingrenmed.com',
        changeOrigin: true,
      },
      '^/admin/account/api': {
        target: 'https://gensci-dev.xingrenmed.com',
        changeOrigin: true,
      },
      '^/parasol/any/api': {
        target: 'https://gensci-dev.xingrenmed.com',
        changeOrigin: true,
      },
      '^/admin/meta/api': {
        target: 'https://gensci-dev.xingrenmed.com',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /@\//, // import alias to handle @src/ file easily
        replacement: resolve('./src') + '/'
      },
      {
        find: /^~(.+)/, // handle css import from scss
        replacement: '$1'
      }
    ]
  },
  plugins: [
    vue(),
    tsconfigPaths()
  ]
})
