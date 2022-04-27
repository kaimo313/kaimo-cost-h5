import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
    }
  },
  css: {
    // css模块化，文件以.module.[css|less|scss]结尾，否则不生效的
    modules: {
      /**
       * 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
       * 默认：'camelCaseOnly'。
       * 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly'
       * */ 
      localsConvention: 'dashesOnly'
    },
    // 指定传递给 CSS 预处理器的选项。
    preprocessorOptions: {
      // 预编译支持 less
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    react(),
    styleImport({
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          }
        }
      ]
    })
  ]
})
