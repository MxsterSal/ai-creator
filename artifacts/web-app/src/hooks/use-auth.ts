import { useState, useEffect } from "react";
import { useLocation } from "wouter";

interface User {
  email: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    const storedToken = localStorage.getItem("user_token");
    
    if (storedEmail && storedToken) {
      setUser({ email: storedEmail, token: storedToken });
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, token: string) => {
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_token", token);
    setUser({ email, token });
    setLocation("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_token");
    setUser(null);
    setLocation("/");
  };

  return { user, isLoading, login, logout };
}
