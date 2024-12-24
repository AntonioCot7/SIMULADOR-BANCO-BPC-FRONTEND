import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'http://banco-bpc-site.s3-website-us-east-1.amazonaws.com/', 
});