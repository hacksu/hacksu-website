import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

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
    // files are moved to dist by github actions cd
    outDir: "../dist2"
  },
  server: {
    watch: {
      ignored: ["db/*.json"]
    }
  }
})
