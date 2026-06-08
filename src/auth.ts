import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "printlab770@gmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      return !!email && ADMIN_EMAILS.includes(email);
    },
    async session({ session }) {
      const email = session.user?.email?.toLowerCase();
      if (email && ADMIN_EMAILS.includes(email)) {
        return session;
      }
      return null as never;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  trustHost: true,
});
