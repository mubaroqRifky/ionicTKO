// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, SignInMethod } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCZ-VkkshocTUM5HyrpQyErlrombrTvHg",
    authDomain: "catch-of-the-day-a8059.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-a8059-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-a8059",
    storageBucket: "catch-of-the-day-a8059.appspot.com",
    messagingSenderId: "537737760177",
    appId: "1:537737760177:web:b7fff871c001df32b84190",
    measurementId: "G-6HM5480T9L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, SignInMethod, googleProvider };
