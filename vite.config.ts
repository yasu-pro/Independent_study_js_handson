import { defineConfig } from "vite";
import { resolve } from "path";
import * as glob from "glob";

const entries = glob.sync("work*/index.html").reduce((acc, file) => {
  const name = file.split("/")[0];
  acc[name] = resolve(__dirname, file);
  return acc;
}, {} as Record<string, string>);

export default defineConfig({
  root: ".",
  build: {
    rollupOptions: {
      input: entries,
    },
  },
  server: {
    open: "/index.html", // 必要なら変更
  },
});
