import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  server:{
    'api':"http://localhost:3000/"
  },
  plugins: [react(),
     tailwindcss(),
  ],
})
