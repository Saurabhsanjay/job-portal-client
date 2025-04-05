'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  token: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Logging in with email:", email);
    console.log("Logging in with password:", password);
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data:", data);
      if (response.ok && data.status === "SUCCESS") {
        const loggedInUser: User = {
          id: data?.data?.user._id,
          email: data.data.user.personalDetails.email,
          token: data.data.token,
          role: data.data.user.role,
        };

        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        router.push("/");
        toast.success("Login successful");
      } else {
        // toast.error(data.message||"Login failed");
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.message||"Login failed");
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
