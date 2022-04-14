import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjgKykiLwXgpqR5pxOFZ_iW1jSn5VtF1g",
    authDomain: "we-lvlup-instagram-71b2d.firebaseapp.com",
    projectId: "we-lvlup-instagram-71b2d",
    storageBucket: "we-lvlup-instagram-71b2d.appspot.com",
    messagingSenderId: "1029764273611",
    appId: "1:1029764273611:web:e9bb5f4c4bca0a4b5e524e",
    measurementId: "G-Z61QSRXVY6"
};
    
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

