// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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
const db = getFirestore(app);

// Set persistence to local to ensure session persists across page reloads
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Register function
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login function
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout function
export function logout() {
  return signOut(auth);
}

// Save user data to Firestore
export async function saveUserData(uid, firstName, lastName) {
  try {
    await setDoc(doc(db, "users", uid), {
      firstName: firstName,
      lastName: lastName
    });
    console.log("User data saved successfully.");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

// Load user data from Firestore
export async function loadUserData(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error loading user data:", error);
    return null;
  }
}

// Initialize an auth listener to persist the user's session and handle state changes
export function initAuthListener(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in, execute callback with user data
      callback(user);
    } else {
      // User is logged out, execute callback with null
      callback(null);
    }
  });
}
