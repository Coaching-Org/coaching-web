import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_FS_API_KEY,
  // @ts-ignore
  authDomain: import.meta.env.VITE_FS_AUTH_DOMAIN,
  // @ts-ignore
  projectId: import.meta.env.VITE_FS_PROJECT_ID,
  // @ts-ignore
  storageBucket: import.meta.env.VITE_FS_STORAGE_BUCKET,
  // @ts-ignore
  messagingSenderId: import.meta.env.VITE_FS_MESSAGING_SENDER_ID,
  // @ts-ignore
  appId: import.meta.env.VITE_FS_APP_ID,
  // @ts-ignore
  measurementId: import.meta.env.VITE_FS_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestoreDb = getFirestore(app);

export const fsCollectionKey = {
  appointments: "appointments",
  notes: "notes",
};
