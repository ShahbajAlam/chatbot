import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB72nYJ1SM5UcWCEThzAt4G3nzyzZ7RQxw",
    authDomain: "chatbot-bc460.firebaseapp.com",
    projectId: "chatbot-bc460",
    storageBucket: "chatbot-bc460.appspot.com",
    messagingSenderId: "440177487379",
    appId: "1:440177487379:web:2d1bb909c06704229659e6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
