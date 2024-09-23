import NextAuth from "next-auth";
// providers
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";


import { AuthOptions } from "next-auth"
import { fetchloginUserAPI, fetchRefreshTokenAPI, fetchRegisterUserAPI, fetchUserExistsByEmailAPI } from "@/services/authService";
import generatePasswordFromEmail from "@/utils/generatePasswordFromEmail";

export const authOptions: AuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                phoneNumber: { label: "PhoneNumber", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.phoneNumber || !credentials?.password) {
                    throw new Error("Invalid email or password");
                }
                const resData = await fetchloginUserAPI(credentials.phoneNumber, credentials.password);
                if (!resData) {
                    throw new Error("Invalid phoneNumber or password");
                }
                return resData;
            }
        })

    ],
    pages: {
        signIn: "/auth/login",
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }) {
            session.user = token as any
            return session;
        },
        async jwt({ token, user, profile, account }) {

            //  chắc chắn phải kiểm tra token.accessToken nếu không nó sẽ render lại
            if (token.email && !token.accessToken && !token.refreshToken) {

                const email = token.email
                const resData = await fetchUserExistsByEmailAPI(token.email);
                if (resData) {
                    const { accessToken, refreshToken } = await fetchloginUserAPI(token.email, token.email);
                    return { ...token, accessToken, refreshToken };
                } else {
                    const dataUser = {
                        name: token.name,
                        username: token.email,
                        password: token.email,
                        email: token.email,
                        image: token.image || profile?.image || user.image || " unavailable",
                        role: "CUSTOMER",
                        authProvider: account?.provider
                    }
                    const { accessToken, refreshToken } = await fetchRegisterUserAPI(dataUser);

                    return { ...token, accessToken, refreshToken };

                }
            }
            return { ...token, ...user };
        },

    }



}

export default NextAuth(authOptions);
