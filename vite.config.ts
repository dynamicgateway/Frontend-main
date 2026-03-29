import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    base: '/',
    plugins: [react(), tailwindcss()],
    define: {
      global: 'window',
      // Set the API endpoint directly to the backend URL
      'import.meta.env.VITE_API_ENDPOINT': JSON.stringify('https://be.dev.pivoters.com/pivoters/api'),
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
    },
    preview: {
      open: true,
      port: 8080,
    },
    server: {
      open: true, // Opens the browser automatically
      port: 8080, // Port for the development server
      strictPort: false, // Allow fallback to other ports if busy
      hmr: true, // Enable hot module replacement
    },
  };

  // if (command === 'serve') {
  //   config.server = {
  //     ...config.server,
  //     proxy: {
  //       '/s/': {
  //         target: 'https://be.dev.pivoters.com/pivoters/api',
  //         changeOrigin: true,
  //       },

  //       '/ws/': {
  //         target: 'voice.dev.pivoters.com',
  //         changeOrigin: true,
  //       },
  //     },
  //   };
  // }

  return config;
});
