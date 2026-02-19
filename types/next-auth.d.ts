import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken: string
        user: {
            id: string
            role: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        token: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: string
        accessToken: string
    }
}
