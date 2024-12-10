import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If the callback URL is a relative path, prepend the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Otherwise, use the provided URL as-is
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },  
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
