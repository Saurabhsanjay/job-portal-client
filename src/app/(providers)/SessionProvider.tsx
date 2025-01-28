"use client";

import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export type SessionProviderProps = {
  children: React.ReactNode;
  session:Session | null
};

export const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};
