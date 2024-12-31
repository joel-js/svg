import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-ws',
      config() {
        return {
          define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            global: 'globalThis',
          },
        };
      },
      resolveId(source) {
        if (source === 'ws') {
          return 'virtual:ws-polyfill';
        }
      },
      load(id) {
        if (id === 'virtual:ws-polyfill') {
          return `
            export default class WebSocket extends window.WebSocket {
              constructor(url, protocols) {
                super(url, protocols);
              }
            }
            export class Server {
              constructor() {
                throw new Error('WebSocket Server is not supported in the browser');
              }
            }
          `;
        }
      },
    },
  ],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  optimizeDeps: {
    exclude: ['lib/vlc/experimental.js']
  },
  build: {
    rollupOptions: {
      external: [/lib\/vlc\/.*/]
    }
  },
  assetsInclude: ['**/*.wasm']
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     headers: {
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//       'Cross-Origin-Opener-Policy': 'same-origin',
//     }
//   },
//   optimizeDeps: {
//     exclude: ['lib/vlc/experimental.js'],
//     include: ['ws']
//   },
//   resolve: {
//     alias: {
//       ws: 'ws/browser.js'  // Use the browser version of ws
//     }
//   },
//   define: {
//     global: 'window',  // Define global as window for browser environment
//   },
//   build: {
//     rollupOptions: {
//       external: [/lib\/vlc\/.*/],
//       output: {
//         manualChunks: {
//           vendor: ['ws']
//         }
//       }
//     }
//   },
//   assetsInclude: ['**/*.wasm']
// });

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     headers: {
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//       'Cross-Origin-Opener-Policy': 'same-origin',
//     },
//   },
//   optimizeDeps: {
//     exclude: ['lib/vlc/experimental.js']
//   },
//   build: {
//     rollupOptions: {
//       external: [/lib\/vlc\/.*/]
//     }
//   },
//   assetsInclude: ['**/*.wasm']
// })
