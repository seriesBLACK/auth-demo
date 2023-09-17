// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN_8yCa9bnFGFzXrSf8nrdGApEa4UvUhY",
  authDomain: "auth-demo-12964.firebaseapp.com",
  projectId: "auth-demo-12964",
  storageBucket: "auth-demo-12964.appspot.com",
  messagingSenderId: "817793739395",
  appId: "1:817793739395:web:0759700f29eedef3b149b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);