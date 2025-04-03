import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the structure of the API response
interface LoginResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: string; // JWT token
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isRecruiter: { label: "Is Recruiter", type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Prepare the payload
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };

          // Add isRecruiter field only if it's true
          if (credentials.isRecruiter === "true") {
            Object.assign(payload, { isRecruiter: true });
          }

          // Make the API call
          const res = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          });

          const response: LoginResponse = await res.json();

          // Check if the response is successful
          if (res.ok && response.status === "SUCCESS") {
            // Return an object that will be encoded in the JWT
            return {
              id: "user-id", // This will be updated in the JWT callback
              email: credentials.email,
              token: response.data, // Store the JWT token
              isRecruiter: credentials.isRecruiter === "true",
            };
          }

          // If the response was not successful, throw an error with the message from the API
          throw new Error(response.message || "Authentication failed");
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          isRecruiter: user.isRecruiter,
        };
      }

      // Return previous token if the access token has not expired yet
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string,
        isRecruiter: token.isRecruiter as boolean,
      };

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
