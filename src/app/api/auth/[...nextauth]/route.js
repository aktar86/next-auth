import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const userCollections = dbConnect("users");

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // sign in with {name} button
      name: "Email &  Password",

      // form inputs
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter E-mail" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials, req) {
        //my own login logic
        const { email, password } = credentials;

        // const user = userList.find((user) => user.name === username);
        const user = await userCollections.findOne({ email });

        if (!user) return null;

        const isPasswordOk = await bcrypt.compare(password, user?.password);

        if (isPasswordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
