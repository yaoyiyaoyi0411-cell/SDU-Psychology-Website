import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 说明：这里使用相对路径 base:'/'，部署到 Cloudflare Pages 根目录时可直接使用。
// 如果未来部署到子路径（例如 https://example.com/xinxie/），把 base 改成 '/xinxie/'。
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
