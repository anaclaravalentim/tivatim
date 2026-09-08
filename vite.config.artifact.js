import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * Build alternativo usado só para gerar um único arquivo HTML autocontido
 * (JS, CSS e todas as fotos de produto embutidas como base64), para publicar
 * como Artifact e compartilhar um link de visualização rápida.
 *
 * O build "de verdade" do projeto continua sendo `npm run build` (vite.config.js),
 * que gera arquivos separados/otimizados para hospedagem normal.
 */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-artifact',
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100 * 1024 * 1024,
  },
});
