import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                try {
                    const user = await userLogIn(credentials.email, credentials.password)

                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return { id: user.token, ...user }
                    }

                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                } catch {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session) {
                return { ...token, ...session };
            }
            if (user) {
                return { ...token, ...user }
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    }
}
