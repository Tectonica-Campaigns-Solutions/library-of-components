import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeMjHjxJvdO9vho7z8cmS7mdpVsiy8IXs",
  authDomain: "teconica-ui-page-builder.firebaseapp.com",
  projectId: "teconica-ui-page-builder",
  storageBucket: "teconica-ui-page-builder.appspot.com",
  messagingSenderId: "661578713215",
  appId: "1:661578713215:web:2db0c69dd7e96bea41174a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);