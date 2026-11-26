import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath,URL} from 'node:url';

// base './' keeps the built dist/ working on any static host or sub-folder.
export default defineConfig({
  base:'./',
  plugins:[react()],
  resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},
  server:{port:5173},
});
