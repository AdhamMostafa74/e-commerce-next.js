import { login } from "@/hooks/auth";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text", placeholder: "YourEmail@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("CREDENTIALS:", credentials);

                const response = await login(credentials?.email ?? '', credentials?.password ?? '');

                console.log("BACKEND RESPONSE:", response);

                if (response.message == 'success') {
                    console.log("LOGIN SUCCESS");
                    const user = {
                        id: response.user.email,
                        name: response.user.name,
                        email: response.user.email,
                        role: response.user.role,
                        token: response.token
                    }
                    return user;
                } else {
                    console.log("LOGIN FAILED");
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register"
    },
    callbacks: {
        async session({ session, token }) {
            session.user.role = token.role as string
            session.accessToken = token.accessToken as string

            return session

        },

        async jwt({ user, token }) {
            if (user) {
                token.accessToken = user.token;
                token.role = user.role;
            }

            return token
        }

    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    }
})

export { handler as GET, handler as POST }