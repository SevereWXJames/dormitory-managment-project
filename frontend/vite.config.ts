import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { cspProxyPlugin } from 'vite-plugin-content-security-policy';

export const ENVIRONMENTS = ['production', 'staging', 'development'];
export type Environment = typeof ENVIRONMENTS[number];

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        cspProxyPlugin<Environment>({
            rules: {
                "script-src": "'self'",
                "default-src": "'self'",
                "img-src": "'self'",
                "frame-ancestors": "'none'",
                "form-action": "'self'"
            },
            reportType: 'strict',
        }),
        react(),
        tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server:{
        headers:{
            "X-Content-Type-Options": "nosniff",
        }
    }
})
