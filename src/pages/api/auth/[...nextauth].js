import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";



export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const api = process.env.API_ENDPOINT;
                const res = await fetch(api + `login/${credentials?.username}/${credentials?.password}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const user = await res.json()
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages:{
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})