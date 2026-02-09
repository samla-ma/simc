import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// added for component:
import { resolve } from 'path'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },

  // added for component:
  build: {
    lib: {
      // Путь к файлу вашего компонента
      entry: resolve(__dirname, 'src/load-img-viewer.tsx'),
      name: 'ImgViewer',
      formats: ['umd', 'es'],
      fileName: (format) => `img-viewer.${format}.js`,
    },
    // ВАЖНО: Если вы хотите, чтобы React был ВНУТРИ файла, 
    // удалите 'react' из rollupOptions.external.
    // Если React уже есть на целевой странице, оставьте как в предыдущем примере.    
    rollupOptions: {
      // Исключаем React из сборки, чтобы не дублировать его у потребителя
      //external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOMClient',
        },
      },
    },
    // Включаем sourcemaps для удобной отладки
    sourcemap: true,
  },

})
