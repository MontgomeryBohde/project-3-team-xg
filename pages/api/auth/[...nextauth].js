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
  secret: "b4f82be5950266447902258491326789a6585803",
};

export default NextAuth(authOptions);
