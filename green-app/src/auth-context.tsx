import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, signOut as signOutFirebase, Auth } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAsgAmNRIaCYgyb3tnSvIPyVs5mACBFgVw",
  authDomain: "green-3d42b.firebaseapp.com",
  projectId: "green-3d42b",
  storageBucket: "green-3d42b.appspot.com",
  messagingSenderId: "166694084181",
  appId: "1:166694084181:web:65d3b7b13d18f873bf3edc",
  measurementId: "G-0WYKJLK1TV"
};

const app = initializeApp(firebaseConfig);

interface AuthContextProps {
  currentUser: any;
  signInWithEmailAndPassword: (auth: Auth, email: string, password: string) => Promise<void>; // Update the type here
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  auth: Auth;
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

  const signInWithEmailAndPassword = async (auth: Auth, email: string, password: string) => {
    await signInWithEmailAndPasswordFirebase(auth, email, password);
  };
  
  const createUserWithEmailAndPassword = async (email: string, password: string) => {
    await createUserWithEmailAndPasswordFirebase(auth, email, password);
  };

  const signOut = async () => {
    await signOutFirebase(auth);
  };

  const value: AuthContextProps = {
    currentUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// auth-context.tsx

// auth-context.tsx

export const useAuth = () => {
  const context = useContext<AuthContextProps | undefined>(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};


