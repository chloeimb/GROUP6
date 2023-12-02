// auth-context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, Auth, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase } from 'firebase/auth';
import app from './firebase';

interface AuthContextProps {
  currentUser: any;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth: Auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPasswordFirebase(auth, email, password);
    } catch (error: any) {
      console.error('Error signing in:', (error as Error).message);
      throw error;
    }
  };

  const value: AuthContextProps = {
    currentUser,
    signInWithEmailAndPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
