import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/signin':"http://localhost:8080",
      '/schedule':"http://localhost:8080",
      '/dashboard':"http://localhost:8080",
      '/signup':"http://localhost:8080"

    }
  },
  plugins: [react()]
})
