// auth-context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmailAndPassword = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
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
