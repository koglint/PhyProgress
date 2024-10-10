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

// Save task progress for lessons to Firestore
export async function saveTaskProgress(uid, tasks) {
  try {
    await setDoc(doc(db, "tasks", uid), { tasks });
    console.log("Task progress saved successfully.");
  } catch (error) {
    console.error("Error saving task progress:", error);
  }
}

// Load task progress for lessons from Firestore
export async function loadTaskProgress(uid) {
  try {
    const docRef = doc(db, "tasks", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tasks = docSnap.data().tasks;
      for (const [lesson, progress] of Object.entries(tasks)) {
        for (const [status, checked] of Object.entries(progress)) {
          const checkboxId = `${status}-${lesson.split(" ")[2]}`;
          const checkbox = document.getElementById(checkboxId);
          if (checkbox) {
            checkbox.checked = checked;
          }
        }
      }
      console.log("Task progress loaded successfully.");
    } else {
      console.log("No task progress found for this user.");
    }
  } catch (error) {
    console.error("Error loading task progress:", error);
  }
}

// Initialize an auth listener to persist the user's session and handle state changes
export function initAuthListener(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);  // User is logged in, execute callback with user data
    } else {
      callback(null);  // User is logged out, execute callback with null
    }
  });
}
