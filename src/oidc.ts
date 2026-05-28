import { oidcSpa } from 'oidc-spa/react-tanstack-start'
import z from 'zod'

export const {
  bootstrapOidc,
  useOidc,
  getOidc,
  enforceLogin,
  // oidcFnMiddleware,
  // oidcRequestMiddleware,
} = oidcSpa
  .withExpectedDecodedIdTokenShape({
    decodedIdTokenSchema: z.object({
      name: z.string(),
      picture: z.string().optional(),
      email: z.email().optional(),
      preferred_username: z.string().optional(),
      realm_access: z.object({ roles: z.array(z.string()) }).optional(),
    }),
  })
  // .withAccessTokenValidation({
  //   type: 'RFC 9068: JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens',
  //   expectedAudience: () => 'account',
  //   accessTokenClaimsSchema: z.object({
  //     sub: z.string(),
  //     realm_access: z.object({ roles: z.array(z.string()) }).optional(),
  //   }),
  //   accessTokenClaims_mock: {
  //     sub: 'u123',
  //     realm_access: { roles: ['realm-admin'] },
  //   },
  // .withAutoLogin()
  .createUtils()

bootstrapOidc(({ process }) =>
  process.env.OIDC_USE_MOCK === 'true'
    ? { implementation: 'mock', isUserInitiallyLoggedIn: true }
    : {
        implementation: 'real',
        issuerUri: process.env.VITE_KEYCLOAK_URL,
        clientId: process.env.VITE_KEYCLOAK_CLIENT_ID,
        debugLogs: true,
      },
)

// export const fetchWithAuth: typeof fetch = async (input, init) => {
//   const oidc = await getOidc()

//   if (oidc.isUserLoggedIn) {
//     const accessToken = await oidc.getAccessToken()
//     const headers = new Headers(init?.headers)
//     headers.set('Authorization', `Bearer ${accessToken}`)
//     ;(init ??= {}).headers = headers
//   }

//   return fetch(input, init)
// }
