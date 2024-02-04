import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import Credentials from '@auth/core/providers/credentials'
import { skipCSRFCheck } from '@auth/core'

const db = new PrismaClient()

export const handle = SvelteKitAuth({
  session: {
    strategy: "jwt",
  },
  secret: 'bla',
  trustHost: true,
  adapter: new PrismaAdapter(db),
  providers: [
    Credentials({
      name: "Password",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, request) {
        const user = await db.user.findFirst({ where: { email: credentials.username }})
        console.log('authorized', { user })

        return user
      }
    }),
    /*
    {
      id: "fake-provider",
      name: "Fake Provider",
      type: "oidc",
      issuer: 'https://oauth.wiremockapi.cloud',
      authorization : "https://oauth.wiremockapi.cloud/oauth/authorize",
      token: "https://oauth.wiremockapi.cloud/oauth/token",
      userinfo: "https://oauth.wiremockapi.cloud/oauth/userinfo",
      clientId: 'fake-id',
      clientSecret: 'fake-secret'
    }
    */
    {
      id: "fake-provider",
      name: "Fake Provider",
      type: "oauth2",
      authorization : "https://oauth.wiremockapi.cloud/oauth/authorize",
      token: "https://oauth.wiremockapi.cloud/oauth/token",
      userinfo: "https://oauth.wiremockapi.cloud/oauth/userinfo",
      clientId: 'fhiYzEP8j1jBLNnLhbC_U6qG',
      clientSecret: '8gEIuTMkQNRp3_MrSeAYQyD_y2bJ1LhPDP4Uh-RZX4cB7ukO'
    },

  ],

  callbacks: {
  }
})
