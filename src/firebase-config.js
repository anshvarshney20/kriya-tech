// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCDHX3e2cPcocv7jJAcMxBmJe86dPgIg1M",
//   authDomain: "creators-dev-test-env.firebaseapp.com",
//   projectId: "creators-dev-test-env",
//   storageBucket: "creators-dev-test-env.appspot.com",
//   messagingSenderId: "689025838929",
//   appId: "1:689025838929:web:de5a918e9520d826a76d70",
//   measurementId: "G-9S7YWD83SX"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDmGLM0-ENT4dPo4GQZw_1uNYF7SBxqNKU",
  authDomain: "template-1a22b.firebaseapp.com",
  projectId: "template-1a22b",
  storageBucket: "template-1a22b.appspot.com",
  messagingSenderId: "435832954719",
  appId: "1:435832954719:web:d3a285f3477d4202caa0ea",
  measurementId: "G-HB41KCCBYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export { db };
