import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import 'dotenv/config';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import svgSprites from 'rollup-plugin-svg-sprites';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('vite.config defineConfig', command, mode);
  const env = loadEnv(mode, process.cwd(), '');
  console.log('vite.config env.NODE_ENV=', env.NODE_ENV);
  // According to the project configuration. Can be configured in the .env file
  const prodMock = true;

  return {
    base: '/', // 注意，必须以"/"结尾，BASE_URL配置
    define: {
      'process.env': env
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      svgSprites({
        vueComponent: true,
        exclude: ['node_modules/**'],
        symbolId(filePath) {
          const filename = path.basename(filePath);
          return 'icon-' + filename.substring(0, filename.lastIndexOf('.'));
        }
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
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      host: 'localhost',
      port: 8001,
      proxy: {
        '/api-test': {
          target: 'https://api.midfar.com/dspt_test/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-test/, '')
        },
        headers: {
          Cookie: env.VUE_APP_COOKIE
        }
      }
    }
  };
});
