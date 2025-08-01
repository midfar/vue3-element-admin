import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import fs from 'fs';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import Inspect from 'vite-plugin-inspect';

// element plus 样式自动按需导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
// import svgSprites from 'rollup-plugin-svg-sprites';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('vite.config defineConfig', command, mode);
  const env = loadEnv(mode, process.cwd(), '');
  console.log('vite.config env.VITE_ENV=', env.VITE_ENV);
  // According to the project configuration. Can be configured in the .env file
  const prodMock = true;

  // 解决终端 optimized dependencies changed. reloading 问题
  const optimizeDepsElementPlusIncludes = ['element-plus/es'];
  fs.readdirSync('node_modules/element-plus/es/components').map((dirname) => {
    fs.access(
      `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
      (err) => {
        if (!err) {
          optimizeDepsElementPlusIncludes.push(
            `element-plus/es/components/${dirname}/style/css`
          );
        }
      }
    );
  });

  return {
    base: '/', // 注意，必须以"/"结尾，BASE_URL配置
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes
    },
    plugins: [
      vue(),
      Inspect(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      svgSpritePlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],

        symbolId: 'icon-[name]',

        inject: 'body-last' // 'body-prepend' | 'body-append' | false
      }),
      // https://openbase.com/js/vite-plugin-mock
      viteMockServe({
        ignore: /^_/,
        mockPath: './mock/',
        supportTs: true,
        watchFiles: true,
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        // configPath: './mock/index.js',
        logger: false,
        injectCode: `import { setupProdMockServer } from '../mock/_createProductionServer.js';
      setupProdMockServer();`
      })
    ],
    server: {
      host: 'localhost',
      port: 8001,
      proxy: {
        '/api-test': {
          target: 'https://api.midfar.com/dspt_test/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-test/, ''),
          headers: {
            Cookie: env.VITE_COOKIE
          }
        }
      }
    }
  };
});
