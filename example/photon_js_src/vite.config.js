import wasm from "vite-plugin-wasm";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/photon_js_dist",
  plugins: [wasm()],
  build: {
    target: "ESNext",
    minify: false,
    assetsDir: "assets",
    rollupOptions: {
      preserveEntrySignatures: true,
      output: {
        dir: "../web/photon_js_dist",
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
