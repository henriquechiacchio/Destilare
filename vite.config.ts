import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoName = 'Destilare'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
})
