import { login } from "@/services/auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const response = await login(
                    credentials.email,
                    credentials.password
                )

                if (response.message !== "success") {
                    return null
                }

                // 🔥 DECODE JWT TO GET USER ID
                const decoded: any = jwtDecode(response.token)
                // decoded = { id, name, role, iat, exp }

                return {
                    id: decoded.id,              // ✅ REAL USER ID
                    name: decoded.name,
                    email: response.user.email,
                    role: decoded.role,
                    token: response.token,
                }
            },
        }),
    ],

    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.accessToken = user.token
            }
            return token
        },

        async session({ session, token }) {
            session.user.id = token.id as string
            session.user.role = token.role as string
            session.accessToken = token.accessToken as string
            return session
        },
    },

    secret: process.env.AUTH_SECRET,
})

export { handler as GET, handler as POST }
