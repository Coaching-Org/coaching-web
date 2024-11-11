import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBztUHbC3CzDKLry-fSzh3FUaZlFuGc9Q4",
  authDomain: "coaching-development-a5261.firebaseapp.com",
  projectId: "coaching-development-a5261",
  storageBucket: "coaching-development-a5261.firebasestorage.app",
  messagingSenderId: "635392879868",
  appId: "1:635392879868:web:2575971c37574c85b3bb79",
  measurementId: "G-EX97GWN03B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestoreDb = getFirestore(app);

export const fsCollectionKey = {
  appointments: "appointments",
  notes: "notes",
};
