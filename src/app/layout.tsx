import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./(containers)/footer/Footer";
// import Navbar from "./(containers)/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "@/app/(providers)/SessionProvider";
import ReactQueryProvider from "@/app/(providers)/ReactQueryProvider";
import { ThemeProvider } from "./(providers)/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <SessionProvider session={session}>
          {/* <Navbar /> */}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Footer />
        </SessionProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
