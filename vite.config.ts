import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { oidcSpa } from 'oidc-spa/vite-plugin'
import { defineConfig } from 'vite'
const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart(),
    oidcSpa({
      browserRuntimeFreeze: { enabled: true },
      DPoP: { enabled: true, mode: 'auto' },
    }),
    viteReact(),
    oidcSpa(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
