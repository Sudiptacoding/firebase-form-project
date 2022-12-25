import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDHmmL7nef4QUL_200OMTyNbzs-mWHFbgo",
  authDomain: "first-project-11ced.firebaseapp.com",
  projectId: "first-project-11ced",
  storageBucket: "first-project-11ced.appspot.com",
  messagingSenderId: "897733606124",
  appId: "1:897733606124:web:d1c4b8ae814d7eade403c9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
