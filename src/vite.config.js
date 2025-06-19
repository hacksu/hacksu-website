import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(process.cwd(), "src"),
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: ''
      },
      {
        find: '@',
        replacement: path.resolve(".", 'src')
      }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `\n@import "./src/global.scss";\n`
      }
    }
  },
  build: {
    outDir: "../dist"
  },
  server: {
    watch: {
      ignored: ["db/*.json"]
    }
  }
})
