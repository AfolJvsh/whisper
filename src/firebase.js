
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDowO3E2u0LOFOZs4SFqJYlqVrs8TWHcTw",
  authDomain: "login-page-d2530.firebaseapp.com",
  databaseURL: "https://login-page-d2530-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-page-d2530",
  storageBucket: "login-page-d2530.appspot.com",
  messagingSenderId: "164367130819",
  appId: "1:164367130819:web:8405b10dd28b90c209c276",
  measurementId: "G-11SN0ER53F"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
