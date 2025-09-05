// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBh8oqqHVidZ_c9NP3d_DCbjG3mAOs6TLU",
  authDomain: "notiva-402e0.firebaseapp.com",
  projectId: "notiva-402e0",
  storageBucket: "notiva-402e0.appspot.com",
  messagingSenderId: "47387378523",
  appId: "1:47387378523:web:efa0204185d8d2cbbe107e",
  measurementId: "G-55RRNZB3FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 🔹 Login with Google
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};

// 🔹 Logout
export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// 🔹 Upload file helper (smart uploader)
export const uploadFileSmart = async (file, folder = "uploads") => {
  try {
    const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
};

