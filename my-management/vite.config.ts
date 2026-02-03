import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        //目标服务器
        target: "http://192.168.1.4:8080",
        //更改请求的Origin
        changeOrigin: true,
        //重写路径
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
