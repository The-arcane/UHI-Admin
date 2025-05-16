import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from "../supabase";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  errorMessage: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setErrorMessage(error.message);
      } else {
        setUser(data?.session?.user || null);
      }
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      setUser(data.user);
    } catch (error: any) {
      setErrorMessage(error.message);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      if (error) throw new Error(error.message);
      setUser(data.user);
    } catch (error: any) {
      setErrorMessage(error.message);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/signin');
  };

  const value: AuthContextType = {
    user,
    setUser, // ✅ Exposed here
    login,
    signup,
    logout,
    errorMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {children}
    </AuthContext.Provider>
  );
}
