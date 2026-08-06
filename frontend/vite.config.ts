import { defineConfig } from 'vite'
import path from "path"
import csp from "vite-plugin-csp-guard"
import { definePolicy, self, unsafeInline} from "csp-toolkit"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        csp({
            dev: {
                run: true,  // Run the plugin in dev mode
                outlierSupport: ["tailwind", "scss"],
            },
            policy: definePolicy({
                defaultSrc: [self],
                connectSrc: [self, "http://localhost:3000"],
                imgSrc: [self],
                scriptSrc: [self],
                formAction: [self],
                styleSrcElem: [unsafeInline] //In production, this should not be here
            }),
        }),
        tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server:{
        headers:{
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "frame-ancestors 'none'",
            "X-Frame-Options": "DENY"
        }
    }
})
