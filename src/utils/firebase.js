
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  // apiKey: "AIzaSyAwvFhm9Mk4iAmAaQYkduljqVnGp-d2evc",
  // authDomain: "investorpanel-2fb0d.firebaseapp.com",
  // projectId: "investorpanel-2fb0d",
  // storageBucket: "investorpanel-2fb0d.appspot.com",
  // messagingSenderId: "719953933024",
  // appId: "1:719953933024:web:4c903302f108a332fbd685",
  // measurementId: "G-B69D9JZJNN"
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)


export {db,auth}