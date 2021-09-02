import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8W3taT0z966ptrwqNeRtLKKNlfUPq_4Y",
  authDomain: "react-app-cursos-10a8f.firebaseapp.com",
  projectId: "react-app-cursos-10a8f",
  storageBucket: "react-app-cursos-10a8f.appspot.com",
  messagingSenderId: "128690374969",
  appId: "1:128690374969:web:6a56e50cc985d58e1440e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export{
    db,
    googleAuthProvider
}