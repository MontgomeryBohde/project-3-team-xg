import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

/**
 * @type {import("next-auth").NextAuthOptions}
 */
export const authOptions = {
  providers: [
    /**
     * GitHub authentication provider configuration.
     * @type {import("next-auth/providers").Provider}
     */
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /**
     * Redirect callback to handle URL redirection after sign-in.
     * @param {Object} params - The parameters for the redirect callback.
     * @param {string} params.url - The URL to redirect to.
     * @param {string} params.baseUrl - The base URL of the application.
     * @returns {Promise<string>} The URL to redirect to.
     */
    async redirect({ url, baseUrl }) {
      // If the callback URL is a relative path, prepend the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Otherwise, use the provided URL as-is
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  /**
   * Secret used to encrypt the session.
   * @type {string}
   */
  secret: "b4f82be5950266447902258491326789a6585803",
};

/**
 * Default export for NextAuth configuration.
 * @param {import("next-auth").NextAuthOptions} authOptions - The authentication options.
 * @returns {import("next-auth").NextAuthHandler}
 */
export default NextAuth(authOptions);