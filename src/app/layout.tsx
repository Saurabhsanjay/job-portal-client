import type { Metadata } from "next";
import "./globals.css";
import Footer from "./(containers)/footer/Footer";
import { getServerSession } from "next-auth/next";
import ReactQueryProvider from "@/app/(providers)/ReactQueryProvider";
import { ThemeProvider } from "./(providers)/ThemeProvider";
import { AuthProvider } from "./(providers)/AuthContext";
import Navbar from "./(containers)/navbar/Navbar";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Recruit-G",
  description: "A platform for job seekers and recruiters",
  icons: {
    icon: "/recruitg.png",
    apple: "/recruitg.png",
    shortcut: "/recruitg.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  console.log("session", session);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <ReactQueryProvider>
              <ProtectedRoute>{children}</ProtectedRoute>
            </ReactQueryProvider>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
