// vite.config.ts
import { loadEnv } from "file:///D:/future-front-end/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/future-front-end/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import vueJsx from "file:///D:/future-front-end/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/future-front-end/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/future-front-end/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver, NaiveUiResolver } from "file:///D:/future-front-end/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { createHtmlPlugin } from "file:///D:/future-front-end/node_modules/vite-plugin-html/dist/index.mjs";
import viteCompression from "file:///D:/future-front-end/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///D:/future-front-end/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { viteMockServe } from "file:///D:/future-front-end/node_modules/vite-plugin-mock/dist/index.js";
import { VitePWA } from "file:///D:/future-front-end/node_modules/vite-plugin-pwa/dist/index.mjs";
import preload from "file:///D:/future-front-end/node_modules/vite-plugin-preload/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\future-front-end";
function defineConfig({ command, mode }) {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === "production";
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        // 指定引入根目录下的 requests，config，utils 目录内的所有函数
        dirs: ["./src/requests/", "./src/config/", "./src/utils/**"],
        // 指定生成的 d.ts 文件位置与文件名
        dts: "./src/auto-imports.d.ts",
        // 配置开启 eslint
        eslintrc: { enabled: true },
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // 指定组件位置，默认是src/components
        dirs: ["src/components"],
        // 配置文件生成位置
        dts: "src/components.d.ts",
        resolvers: [NaiveUiResolver(), ElementPlusResolver()]
      }),
      // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
      // 还可配置entry入口文件， inject自定义注入数据等
      createHtmlPlugin(),
      // 开启gzip压缩
      viteCompression({
        // 配置压缩文件的大小>1kb
        threshold: 1024
      }),
      // 打包分析
      visualizer(),
      // mock
      viteMockServe({
        //是否支持ts
        supportTs: true,
        //是否打印日志
        logger: false,
        //mock文件夹路径
        mockPath: "./src/mock",
        //是否开启本地mock
        localEnabled: true
      }),
      VitePWA({
        includeAssets: ["favicon.svg"],
        manifest: false,
        registerType: "autoUpdate",
        workbox: {
          runtimeCaching: [
            {
              // 缓存所有接口
              urlPattern: /\/api-dev\/|\/api-pro\//,
              handler: "CacheFirst",
              options: {
                cacheName: "interface-cache"
              }
            },
            {
              urlPattern: /(.*?)\.(js|css|ts)/,
              // js /css /ts静态资源缓存
              handler: "CacheFirst",
              options: {
                cacheName: "js-css-cache"
              }
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
              // 图片缓存
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache"
              }
            }
          ]
        }
      }),
      preload()
    ],
    base: env.VITE_PUBLIC_PATH,
    css: {
      preprocessorOptions: {
        // 配置全局scss变量
        scss: {
          additionalData: '@import "./src/assets/scss/_color.scss";'
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: 3001,
      // 设为 true 时若端口已会被占用直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      open: true,
      proxy: {
        "/api-dev": {
          // target      : 'http://localhost:3001/',
          // 设置地址为开发环境中的env的VITE_BACKEND_API接口地址
          target: env.VITE_BACKEND_API,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api-dev/, "")
        },
        "/api-pro": {
          // target      : 'http://localhost:3001/',
          // 设置地址为生产环境中的env的VITE_BACKEND_API接口地址
          target: env.VITE_BACKEND_API,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api-pro/, "")
        },
        "/api-pro-mock": {
          target: env.VITE_BACKEND_API,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api-pro-mock/, "")
        },
        "/api-dev-mock": {
          target: env.VITE_BACKEND_API,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api-dev-mock/, "")
        }
      }
    },
    // resolve是一个对象，里面有一个alias属性，用来配置路径别名,这里配置了@指向src目录
    resolve: { alias: { "@": path.resolve(__vite_injected_original_dirname, "src") } },
    // 配置全局变量,这里配置了process.env.NODE_ENV,这样在代码中就可以直接使用process.env.NODE_ENV了
    define: { "process.env": env },
    // build是一个对象，里面有一个outDir属性，用来配置打包后的文件夹名称
    build: {
      outDir: "dist",
      // 指定打包路径，默认为项目根目录下的 dist 目录
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        }
      },
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: isProduction && env.VITE_BUILD_DROP_CONSOLE === "true",
          // 去除 console
          drop_debugger: isProduction
          // 去除 debugger
        }
      },
      chunkSizeWarningLimit: 1500
      // chunk 大小警告的限制（以 kbs 为单位）
    }
  };
}
var vite_config_default = ({ command, mode }) => defineConfig({ command, mode });
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmdXR1cmUtZnJvbnQtZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmdXR1cmUtZnJvbnQtZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mdXR1cmUtZnJvbnQtZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIsIE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jayc7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5pbXBvcnQgcHJlbG9hZCBmcm9tICd2aXRlLXBsdWdpbi1wcmVsb2FkJztcclxuXHJcbi8vIFx1NjNBNVx1NTNFM1x1NUI5QVx1NEU0OVxyXG5pbnRlcmZhY2UgVml0ZUNvbmZpZ09wdGlvbnMge1xyXG4gICAgY29tbWFuZDogJ2J1aWxkJyB8ICdzZXJ2ZSc7XHJcbiAgICBtb2RlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBEZWZpbmVDb25maWdPcHRpb25zIHtcclxuICAgIGNvbW1hbmQ6ICdidWlsZCcgfCAnc2VydmUnO1xyXG4gICAgbW9kZTogc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWZpbmVDb25maWcoeyBjb21tYW5kLCBtb2RlIH06IERlZmluZUNvbmZpZ09wdGlvbnMpIHtcclxuICAgIC8vIFx1ODNCN1x1NTNENlx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxyXG4gICAgLy8gXHU0RUU1XHU0RTBCZW52XHU5MTREXHU3RjZFXHU2NjJGXHU0RTNBXHU0RTg2XHU1NzI4XHU0RUUzXHU3ODAxXHU0RTJEXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU0RjdGXHU3NTI4cHJvY2Vzcy5lbnYuTk9ERV9FTlYsbG9hZEVudlx1NjYyRnZpdGVcdTYzRDBcdTRGOUJcdTc2ODRcdTRFMDBcdTRFMkFcdTY1QjlcdTZDRDVcdUZGMENcdTUzRUZcdTRFRTVcdTgzQjdcdTUzRDZcdTUyMzBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuICAgIGNvbnN0IGVudjogUGFydGlhbDxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XHJcbiAgICBjb25zdCBpc1Byb2R1Y3Rpb246IGJvb2xlYW4gPSBtb2RlID09PSAncHJvZHVjdGlvbic7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgdnVlKCksXHJcbiAgICAgICAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcclxuICAgICAgICAgICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1NUYxNVx1NTE2NVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCByZXF1ZXN0c1x1RkYwQ2NvbmZpZ1x1RkYwQ3V0aWxzIFx1NzZFRVx1NUY1NVx1NTE4NVx1NzY4NFx1NjI0MFx1NjcwOVx1NTFGRFx1NjU3MFxyXG4gICAgICAgICAgICAgICAgZGlyczogWycuL3NyYy9yZXF1ZXN0cy8nLCAnLi9zcmMvY29uZmlnLycsICcuL3NyYy91dGlscy8qKiddLFxyXG4gICAgICAgICAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU3NTFGXHU2MjEwXHU3Njg0IGQudHMgXHU2NTg3XHU0RUY2XHU0RjREXHU3RjZFXHU0RTBFXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgICAgICAgICAgICBkdHM6ICcuL3NyYy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgICAgICAgICAgICAvLyBcdTkxNERcdTdGNkVcdTVGMDBcdTU0MkYgZXNsaW50XHJcbiAgICAgICAgICAgICAgICBlc2xpbnRyYzogeyBlbmFibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTdFQzRcdTRFRjZcdTRGNERcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdTY2MkZzcmMvY29tcG9uZW50c1xyXG4gICAgICAgICAgICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cyddLFxyXG4gICAgICAgICAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3NTFGXHU2MjEwXHU0RjREXHU3RjZFXHJcbiAgICAgICAgICAgICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpLCBFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgLy8gXHU5RUQ4XHU4QkE0XHU0RjFBXHU1NDExIGluZGV4Lmh0bWwgXHU2Q0U4XHU1MTY1IC5lbnYgXHU2NTg3XHU0RUY2XHU3Njg0XHU1MTg1XHU1QkI5XHVGRjBDXHU3QzdCXHU0RjNDIHZpdGUgXHU3Njg0IGxvYWRFbnZcdTUxRkRcdTY1NzBcclxuICAgICAgICAgICAgLy8gXHU4RkQ4XHU1M0VGXHU5MTREXHU3RjZFZW50cnlcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdUZGMEMgaW5qZWN0XHU4MUVBXHU1QjlBXHU0RTQ5XHU2Q0U4XHU1MTY1XHU2NTcwXHU2MzZFXHU3QjQ5XHJcbiAgICAgICAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oKSxcclxuICAgICAgICAgICAgLy8gXHU1RjAwXHU1NDJGZ3ppcFx1NTM4Qlx1N0YyOVxyXG4gICAgICAgICAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU1MzhCXHU3RjI5XHU2NTg3XHU0RUY2XHU3Njg0XHU1OTI3XHU1QzBGPjFrYlxyXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxMDI0LFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgLy8gXHU2MjUzXHU1MzA1XHU1MjA2XHU2NzkwXHJcbiAgICAgICAgICAgIHZpc3VhbGl6ZXIoKSxcclxuICAgICAgICAgICAgLy8gbW9ja1xyXG4gICAgICAgICAgICB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgICAgICAgICAgIC8vXHU2NjJGXHU1NDI2XHU2NTJGXHU2MzAxdHNcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRUczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vXHU2NjJGXHU1NDI2XHU2MjUzXHU1MzcwXHU2NUU1XHU1RkQ3XHJcbiAgICAgICAgICAgICAgICBsb2dnZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy9tb2NrXHU2NTg3XHU0RUY2XHU1OTM5XHU4REVGXHU1Rjg0XHJcbiAgICAgICAgICAgICAgICBtb2NrUGF0aDogJy4vc3JjL21vY2snLFxyXG4gICAgICAgICAgICAgICAgLy9cdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkZcdTY3MkNcdTU3MzBtb2NrXHJcbiAgICAgICAgICAgICAgICBsb2NhbEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBWaXRlUFdBKHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnXSxcclxuICAgICAgICAgICAgICAgIG1hbmlmZXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICAgICAgICAgICAgd29ya2JveDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWVDYWNoaW5nOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx1N0YxM1x1NUI1OFx1NjI0MFx1NjcwOVx1NjNBNVx1NTNFM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsUGF0dGVybjogL1xcL2FwaS1kZXZcXC98XFwvYXBpLXByb1xcLy8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnaW50ZXJmYWNlLWNhY2hlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybFBhdHRlcm46IC8oLio/KVxcLihqc3xjc3N8dHMpLywgLy8ganMgL2NzcyAvdHNcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTdGMTNcdTVCNThcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdqcy1jc3MtY2FjaGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsUGF0dGVybjogLyguKj8pXFwuKHBuZ3xqcGU/Z3xzdmd8Z2lmfGJtcHxwc2R8dGlmZnx0Z2F8ZXBzKS8sIC8vIFx1NTZGRVx1NzI0N1x1N0YxM1x1NUI1OFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2ltYWdlLWNhY2hlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBwcmVsb2FkKCksXHJcbiAgICAgICAgXSxcclxuICAgICAgICBiYXNlOiBlbnYuVklURV9QVUJMSUNfUEFUSCxcclxuICAgICAgICBjc3M6IHtcclxuICAgICAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU1MTY4XHU1QzQwc2Nzc1x1NTNEOFx1OTFDRlxyXG4gICAgICAgICAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zY3NzL19jb2xvci5zY3NzXCI7JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXJ2ZXI6IHtcclxuICAgICAgICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICAgICAgICBwb3J0OiAzMDAxLFxyXG4gICAgICAgICAgICAvLyBcdThCQkVcdTRFM0EgdHJ1ZSBcdTY1RjZcdTgyRTVcdTdBRUZcdTUzRTNcdTVERjJcdTRGMUFcdTg4QUJcdTUzNjBcdTc1MjhcdTc2RjRcdTYzQTVcdTkwMDBcdTUxRkFcdUZGMENcdTgwMENcdTRFMERcdTY2MkZcdTVDMURcdThCRDVcdTRFMEJcdTRFMDBcdTRFMkFcdTUzRUZcdTc1MjhcdTdBRUZcdTUzRTNcdTMwMDJcclxuICAgICAgICAgICAgc3RyaWN0UG9ydDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICAgICAnL2FwaS1kZXYnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0ICAgICAgOiAnaHR0cDovL2xvY2FsaG9zdDozMDAxLycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU4QkJFXHU3RjZFXHU1NzMwXHU1NzQwXHU0RTNBXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTJEXHU3Njg0ZW52XHU3Njg0VklURV9CQUNLRU5EX0FQSVx1NjNBNVx1NTNFM1x1NTczMFx1NTc0MFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQkFDS0VORF9BUEksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS1kZXYvLCAnJyksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJy9hcGktcHJvJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCAgICAgIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS8nLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1NTczMFx1NTc0MFx1NEUzQVx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NEUyRFx1NzY4NGVudlx1NzY4NFZJVEVfQkFDS0VORF9BUElcdTYzQTVcdTUzRTNcdTU3MzBcdTU3NDBcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0JBQ0tFTkRfQVBJLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGktcHJvLywgJycpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICcvYXBpLXByby1tb2NrJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQkFDS0VORF9BUEksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS1wcm8tbW9jay8sICcnKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnL2FwaS1kZXYtbW9jayc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0JBQ0tFTkRfQVBJLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGktZGV2LW1vY2svLCAnJyksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gcmVzb2x2ZVx1NjYyRlx1NEUwMFx1NEUyQVx1NUJGOVx1OEM2MVx1RkYwQ1x1OTFDQ1x1OTc2Mlx1NjcwOVx1NEUwMFx1NEUyQWFsaWFzXHU1QzVFXHU2MDI3XHVGRjBDXHU3NTI4XHU2NzY1XHU5MTREXHU3RjZFXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBELFx1OEZEOVx1OTFDQ1x1OTE0RFx1N0Y2RVx1NEU4NkBcdTYzMDdcdTU0MTFzcmNcdTc2RUVcdTVGNTVcclxuICAgICAgICByZXNvbHZlOiB7IGFsaWFzOiB7ICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH0gfSxcclxuICAgICAgICAvLyBcdTkxNERcdTdGNkVcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0YsXHU4RkQ5XHU5MUNDXHU5MTREXHU3RjZFXHU0RTg2cHJvY2Vzcy5lbnYuTk9ERV9FTlYsXHU4RkQ5XHU2ODM3XHU1NzI4XHU0RUUzXHU3ODAxXHU0RTJEXHU1QzMxXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU0RjdGXHU3NTI4cHJvY2Vzcy5lbnYuTk9ERV9FTlZcdTRFODZcclxuICAgICAgICBkZWZpbmU6IHsgJ3Byb2Nlc3MuZW52JzogZW52IH0sXHJcbiAgICAgICAgLy8gYnVpbGRcdTY2MkZcdTRFMDBcdTRFMkFcdTVCRjlcdThDNjFcdUZGMENcdTkxQ0NcdTk3NjJcdTY3MDlcdTRFMDBcdTRFMkFvdXREaXJcdTVDNUVcdTYwMjdcdUZGMENcdTc1MjhcdTY3NjVcdTkxNERcdTdGNkVcdTYyNTNcdTUzMDVcdTU0MEVcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcdTU0MERcdTc5RjBcclxuICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICBvdXREaXI6ICdkaXN0JywgLy8gXHU2MzA3XHU1QjlBXHU2MjUzXHU1MzA1XHU4REVGXHU1Rjg0XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNBXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IGRpc3QgXHU3NkVFXHU1RjU1XHJcbiAgICAgICAgICAgIHNvdXJjZW1hcDogZW52LlZJVEVfQlVJTERfU09VUkNFTUFQID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIC8vIG1pbmlmeVx1OUVEOFx1OEJBNGVzYnVpbGRcdUZGMENlc2J1aWxkXHU2QTIxXHU1RjBGXHU0RTBCdGVyc2VyT3B0aW9uc1x1NUMwNlx1NTkzMVx1NjU0OFxyXG4gICAgICAgICAgICAvLyB2aXRlM1x1NTNEOFx1NTMxNlx1RkYxQVRlcnNlciBcdTczQjBcdTU3MjhcdTY2MkZcdTRFMDBcdTRFMkFcdTUzRUZcdTkwMDlcdTRGOURcdThENTZcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTRGN0ZcdTc1MjhcdTc2ODRcdTY2MkYgYnVpbGQubWluaWZ5OiAndGVyc2VyJ1x1RkYwQ1x1NEY2MFx1OTcwMFx1ODk4MVx1NjI0Qlx1NTJBOFx1NUI4OVx1ODhDNVx1NUI4MyBgbnBtIGFkZCAtRCB0ZXJzZXJgXHJcbiAgICAgICAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbnVhbENodW5rczogKGlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1QzA2IG5vZGVfbW9kdWxlcyBcdTRFMkRcdTc2ODRcdTRFRTNcdTc4MDFcdTUzNTVcdTcyRUNcdTYyNTNcdTUzMDVcdTYyMTBcdTRFMDBcdTRFMkEgSlMgXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndmVuZG9yJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGtlZXBfaW5maW5pdHk6IHRydWUsIC8vIFx1OTYzMlx1NkI2MiBJbmZpbml0eSBcdTg4QUJcdTUzOEJcdTdGMjlcdTYyMTAgMS8wXHVGRjBDXHU4RkQ5XHU1M0VGXHU4MEZEXHU0RjFBXHU1QkZDXHU4MUY0IENocm9tZSBcdTRFMEFcdTc2ODRcdTYwMjdcdTgwRkRcdTk1RUVcdTk4OThcclxuICAgICAgICAgICAgICAgICAgICBkcm9wX2NvbnNvbGU6IGlzUHJvZHVjdGlvbiAmJiBlbnYuVklURV9CVUlMRF9EUk9QX0NPTlNPTEUgPT09ICd0cnVlJywgLy8gXHU1M0JCXHU5NjY0IGNvbnNvbGVcclxuICAgICAgICAgICAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2R1Y3Rpb24sIC8vIFx1NTNCQlx1OTY2NCBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLCAvLyBjaHVuayBcdTU5MjdcdTVDMEZcdThCNjZcdTU0NEFcdTc2ODRcdTk2NTBcdTUyMzZcdUZGMDhcdTRFRTUga2JzIFx1NEUzQVx1NTM1NVx1NEY0RFx1RkYwOVxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH06IFZpdGVDb25maWdPcHRpb25zKSA9PiBkZWZpbmVDb25maWcoeyBjb21tYW5kLCBtb2RlIH0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStPLFNBQVMsZUFBZTtBQUN2USxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHFCQUFxQix1QkFBdUI7QUFDckQsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxxQkFBcUI7QUFDNUIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTtBQVpwQixJQUFNLG1DQUFtQztBQXlCekMsU0FBUyxhQUFhLEVBQUUsU0FBUyxLQUFLLEdBQXdCO0FBRzFELFFBQU0sTUFBdUMsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3hFLFFBQU0sZUFBd0IsU0FBUztBQUN2QyxTQUFPO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDUCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQTtBQUFBLFFBRXRDLE1BQU0sQ0FBQyxtQkFBbUIsaUJBQWlCLGdCQUFnQjtBQUFBO0FBQUEsUUFFM0QsS0FBSztBQUFBO0FBQUEsUUFFTCxVQUFVLEVBQUUsU0FBUyxLQUFLO0FBQUEsUUFDMUIsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDckMsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBO0FBQUEsUUFFUCxNQUFNLENBQUMsZ0JBQWdCO0FBQUE7QUFBQSxRQUV2QixLQUFLO0FBQUEsUUFDTCxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUM7QUFBQSxNQUN4RCxDQUFDO0FBQUE7QUFBQTtBQUFBLE1BR0QsaUJBQWlCO0FBQUE7QUFBQSxNQUVqQixnQkFBZ0I7QUFBQTtBQUFBLFFBRVosV0FBVztBQUFBLE1BQ2YsQ0FBQztBQUFBO0FBQUEsTUFFRCxXQUFXO0FBQUE7QUFBQSxNQUVYLGNBQWM7QUFBQTtBQUFBLFFBRVYsV0FBVztBQUFBO0FBQUEsUUFFWCxRQUFRO0FBQUE7QUFBQSxRQUVSLFVBQVU7QUFBQTtBQUFBLFFBRVYsY0FBYztBQUFBLE1BQ2xCLENBQUM7QUFBQSxNQUNELFFBQVE7QUFBQSxRQUNKLGVBQWUsQ0FBQyxhQUFhO0FBQUEsUUFDN0IsVUFBVTtBQUFBLFFBQ1YsY0FBYztBQUFBLFFBQ2QsU0FBUztBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsWUFDWjtBQUFBO0FBQUEsY0FFSSxZQUFZO0FBQUEsY0FDWixTQUFTO0FBQUEsY0FDVCxTQUFTO0FBQUEsZ0JBQ0wsV0FBVztBQUFBLGNBQ2Y7QUFBQSxZQUNKO0FBQUEsWUFDQTtBQUFBLGNBQ0ksWUFBWTtBQUFBO0FBQUEsY0FDWixTQUFTO0FBQUEsY0FDVCxTQUFTO0FBQUEsZ0JBQ0wsV0FBVztBQUFBLGNBQ2Y7QUFBQSxZQUNKO0FBQUEsWUFDQTtBQUFBLGNBQ0ksWUFBWTtBQUFBO0FBQUEsY0FDWixTQUFTO0FBQUEsY0FDVCxTQUFTO0FBQUEsZ0JBQ0wsV0FBVztBQUFBLGNBQ2Y7QUFBQSxZQUNKO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKLENBQUM7QUFBQSxNQUNELFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQSxNQUFNLElBQUk7QUFBQSxJQUNWLEtBQUs7QUFBQSxNQUNELHFCQUFxQjtBQUFBO0FBQUEsUUFFakIsTUFBTTtBQUFBLFVBQ0YsZ0JBQWdCO0FBQUEsUUFDcEI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFFTixZQUFZO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDSCxZQUFZO0FBQUE7QUFBQTtBQUFBLFVBR1IsUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQWlCQSxNQUFLLFFBQVEsY0FBYyxFQUFFO0FBQUEsUUFDNUQ7QUFBQSxRQUNBLFlBQVk7QUFBQTtBQUFBO0FBQUEsVUFHUixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBaUJBLE1BQUssUUFBUSxjQUFjLEVBQUU7QUFBQSxRQUM1RDtBQUFBLFFBQ0EsaUJBQWlCO0FBQUEsVUFDYixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBaUJBLE1BQUssUUFBUSxtQkFBbUIsRUFBRTtBQUFBLFFBQ2pFO0FBQUEsUUFDQSxpQkFBaUI7QUFBQSxVQUNiLFFBQVEsSUFBSTtBQUFBLFVBQ1osY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDQSxVQUFpQkEsTUFBSyxRQUFRLG1CQUFtQixFQUFFO0FBQUEsUUFDakU7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBO0FBQUEsSUFFQSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUssRUFBRSxFQUFFO0FBQUE7QUFBQSxJQUUxRCxRQUFRLEVBQUUsZUFBZSxJQUFJO0FBQUE7QUFBQSxJQUU3QixPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUE7QUFBQSxNQUNSLFdBQVcsSUFBSSx5QkFBeUI7QUFBQTtBQUFBO0FBQUEsTUFHeEMsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ1gsUUFBUTtBQUFBLFVBQ0osY0FBYyxDQUFDLE9BQWU7QUFFMUIsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUM3QixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNYLFVBQVU7QUFBQSxVQUNOLGVBQWU7QUFBQTtBQUFBLFVBQ2YsY0FBYyxnQkFBZ0IsSUFBSSw0QkFBNEI7QUFBQTtBQUFBLFVBQzlELGVBQWU7QUFBQTtBQUFBLFFBQ25CO0FBQUEsTUFDSjtBQUFBLE1BQ0EsdUJBQXVCO0FBQUE7QUFBQSxJQUMzQjtBQUFBLEVBQ0o7QUFDSjtBQUVBLElBQU8sc0JBQVEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUF5QixhQUFhLEVBQUUsU0FBUyxLQUFLLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
