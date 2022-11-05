import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createRequire } from 'module';
import inject from '@rollup/plugin-inject';
import stdLibBrowser from 'node-stdlib-browser';
import checker from 'vite-plugin-checker';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    {
      ...inject({
        global: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'global',
        ],
        process: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'process',
        ],
        Buffer: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'Buffer',
        ],
      }),
      enforce: 'post',
    },
  ],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      ...stdLibBrowser,
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@service': path.resolve(__dirname, './src/service'),
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
