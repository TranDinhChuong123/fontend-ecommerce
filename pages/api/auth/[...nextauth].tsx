import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth"
import { fetchloginUserAPI, fetchloginUserWithProviderAPI, fetchRegisterUserAPI, fetchUserExistsByEmailAPI } from "@/services/authService";

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
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid email or password");
                }
                const resData = await fetchloginUserAPI(credentials.email, credentials.password);
                if (!resData) {
                    throw new Error("Invalid phoneNumber or password");
                }
                console.log("resData", resData);

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
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : `${baseUrl}/auth/login`;
        },
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
                    const { accessToken, refreshToken } = await fetchloginUserWithProviderAPI(token.email);
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
