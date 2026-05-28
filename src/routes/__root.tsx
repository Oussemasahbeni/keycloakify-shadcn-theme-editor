import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { NotFound } from '#/components/not-found'

import { ThemeProvider } from '#/components/theme-provider'
import { TooltipProvider } from '#/components/ui/tooltip'
import { useOidc } from '#/oidc'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Keycloak Theme Editor',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})
function RootDocument({ children }: { children: React.ReactNode }) {
  const { isOidcReady } = useOidc()
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <TooltipProvider>{isOidcReady && <>{children}</>}</TooltipProvider>
          {/*<AutoLogoutWarningOverlay />*/}
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
