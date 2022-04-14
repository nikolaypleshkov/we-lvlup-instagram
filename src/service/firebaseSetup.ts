import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    projectId: "***REMOVED***",
    storageBucket: "***REMOVED***.appspot.com",
    messagingSenderId: "***REMOVED***",
    appId: "1:***REMOVED***:web:e9bb5f4c4bca0a4b5e524e",
    measurementId: "***REMOVED***"
};
    
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

