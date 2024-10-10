// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCNFF9Au24okmKbH6ojbZB6xZIGddyo2U",
  authDomain: "koglinsphysicsclass.firebaseapp.com",
  projectId: "koglinsphysicsclass",
  storageBucket: "koglinsphysicsclass.appspot.com",
  messagingSenderId: "1051481871959",
  appId: "1:1051481871959:web:40bc24648d3a4f91f87512"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Register function
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login function
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
