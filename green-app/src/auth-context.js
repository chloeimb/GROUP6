import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, signOut as signOutFirebase } from 'firebase/auth';

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
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPasswordFirebase(auth, email, password);
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    await createUserWithEmailAndPasswordFirebase(auth, email, password);
  };

  const signOut = async () => {
    await signOutFirebase(auth);
  };

  const value = {
    currentUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
