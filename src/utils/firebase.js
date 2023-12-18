
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAigRMagWEfxsMmmL-LUH_pLP-uJvEQdyA",
  authDomain: "fir-backend-6171c.firebaseapp.com",
  projectId: "fir-backend-6171c",
  storageBucket: "fir-backend-6171c.appspot.com",
  messagingSenderId: "820348467991",
  appId: "1:820348467991:web:30bbb4896ca5a441959552",
  measurementId: "G-STGXV7M7CL"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app)
const db = getFirestore(app);

export {db}