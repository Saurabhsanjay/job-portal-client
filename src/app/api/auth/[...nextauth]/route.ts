import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

// Define the structure of the API response based on your actual response
interface LoginResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: {
    token: string;
    user: {
      _id: string;
      role: string;
      personalDetails: {
        firstName: string;
        lastName: string;
        email: string;
      };
      jobSeekerDetails?: {
        professionalDetails: {
          skills: string[];
        };
        jobPreferences: {
          preferredJobTitles: string[];
          preferredLocations: string[];
          preferredIndustries: string[];
          jobAlerts: boolean;
        };
        // Other jobSeeker properties
      };
      employerDetails?: {
        jobPostings: any[];
      };
      // Other user properties
    };
  };
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
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

          console.log("Attempting login with:", credentials.email);

          // Make the API call
          const res = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          });

          console.log("API Response status:", res.status);
          const response: LoginResponse = await res.json();
          console.log("Full API response:", response);

          // Check if the response is successful
          if (res.ok && response.status === "SUCCESS") {
            // Return user data in the format NextAuth expects
            return {
              id: response.data.user._id,
              email: response.data.user.personalDetails.email,
              name: `${response.data.user.personalDetails.firstName} ${response.data.user.personalDetails.lastName}`,
              role: response.data.user.role,
              token: response.data.token,
              // Include other user data you might need
              firstName: response.data.user.personalDetails.firstName,
              lastName: response.data.user.personalDetails.lastName,
            };
          }

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
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        console.log("JWT Callback - User:", user);
        console.log("JWT Callback - Token before modification:", token);
        
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          accessToken: user.token,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
      
      // On subsequent calls, return the token
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Token:", token);
      console.log("Session Callback - Session before modification:", session);
      
      // Add user info to the session
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        accessToken: token.accessToken,
        firstName: token.firstName,
        lastName: token.lastName,
      };
      
      console.log("Final session object:", session);
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };