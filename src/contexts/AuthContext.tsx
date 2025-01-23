"use client";
import { type User as SupabaseUserType } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "~/lib/supabase/browser";
import { AuthContextTest } from "./actions";

const supabase = supabaseBrowser();

const AuthContext = createContext<AuthContextType>({
  user: null, // Set the initial state according to the type
  isLoading: true,
});

interface ExtendedUser extends Partial<SupabaseUserType> {
  web3address?: string; // Additional property specific to ExtendedUser
}

interface AuthContextType {
  user: ExtendedUser | null;
  isLoading: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder function to update based on actual auth check logic
  const checkAuth = async () => {
    try {
      const web3session = await AuthContextTest();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const extendedUser: ExtendedUser = {
        ...user,
        web3address: web3session.address, // Add web3 address to the user object
      };
      return extendedUser; // Should include information on whether the user is authenticated and their data
    } catch (error) {
      console.error("Failed to verify auth:", error);
      return null;
    }
  };

  useEffect(() => {
    void checkAuth().then((userData) => {
      setUser(userData);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
