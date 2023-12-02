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
export default app;