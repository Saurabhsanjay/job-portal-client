import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./(containers)/footer/Footer";
// import Navbar from "./(containers)/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "@/app/(providers)/SessionProvider";
import ReactQueryProvider from "@/app/(providers)/ReactQueryProvider";
import { ThemeProvider } from "./(providers)/ThemeProvider";
import { AuthProvider } from "./(providers)/AuthContext";
import Navbar from "./(containers)/navbar/Navbar";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Recruit-G - Find Your Dream Job",
  description: "A job portal application to help you find your dream job",
  keywords: [
    "job portal",
    "job search",
    "job application",
    "job listings",
    "job alerts",
    "job recommendations",
    "job seeker",
    "job matching",
    "job opportunities",
    "job vacancies",
    "job postings",
    "job openings",
    "job seekers",
    "job applications",
    "job interviews",
    "job offers",
    "job market",
    "job trends",
    "job search engine",
    "job search website",
    "job search app",
    "job search platform",],
  manifest: "/manifest.webmanifest",
  themeColor: "#4f46e5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JobPortal",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
      <body className={`${inter.variable} antialiased overflow-hidden`}>
      <Toaster position="top-center" reverseOrder={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            
        {/* <SessionProvider session={session}> */}
          {/* <Navbar /> */}
          <ReactQueryProvider>
            <ProtectedRoute>
            {children}
            </ProtectedRoute>
          </ReactQueryProvider>
          <Footer />
        {/* </SessionProvider> */}
        </AuthProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
