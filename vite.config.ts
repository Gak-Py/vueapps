import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ["vue"], // vueが重複してインストールされている場合に解決
  },
  optimizeDeps: {
    exclude: ["fsevents"], // fseventsを最適化から除外
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true, //  CJSとESMが混在しているモジュールを変換
    },
  },
  server: {
    open: true,
  },
});
