import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import mdx from '@mdx-js/rollup';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

//import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const isBuildDemo = mode === 'demo';
  const outDir = isBuildDemo ? 'dist-demo' : 'dist';

  return {
    base: '/react-zimog-ui',
    resolve: {
      alias: {
        '@app': resolve(__dirname, 'src/app'),
        '@ui': resolve(__dirname, 'src/ui'),
      },
    },
    plugins: [
      {
        enforce: 'pre',
        ...mdx(),
      },
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      {
        name: 'copy-404',
        closeBundle() {
          copyFileSync(
            resolve(__dirname, outDir, 'index.html'),
            resolve(__dirname, outDir, '404.html')
          );
        },
      },
    ],
    server: {
      port: 5173,
      open: true,
      host: true,
    },
    build: {
      outDir,
    },
    /*
    build: {
      copyPublicDir: false,
      lib: {
        entry: './src/ui/index.ts',
        name: 'zimog-ui',
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: [
          'react/jsx-runtime',
          ...Object.keys(pkg.peerDependencies || {}),
        ],
      },
    },
  */
  };
});
