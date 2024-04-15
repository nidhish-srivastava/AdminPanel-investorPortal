
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
  apiKey: "AIzaSyDZera0RgnI-l18NNdA7Rl3ZV__B1uM1Ts",
  authDomain: "investorportal-bad23.firebaseapp.com",
  projectId: "investorportal-bad23",
  storageBucket: "investorportal-bad23.appspot.com",
  messagingSenderId: "459705216111",
  appId: "1:459705216111:web:e0bf773744b77f128cb19a",
  measurementId: "G-KC6YTQEB1M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)


export {db,auth}