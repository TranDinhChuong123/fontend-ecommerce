// /types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            name: string;
            username: string;
            password: string;
            email: string;
            image?: string;
            picture?: string;
            role: string;
            auauthProvider: string;
            accessToken?: string;
            refreshToken?: string;
        }
    }
}


