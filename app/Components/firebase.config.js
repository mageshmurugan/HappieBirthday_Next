import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwnr9ucGnB-TDeqhn5J9kqwmSTH9wyPkQ",
  authDomain: "getmeat-2023.firebaseapp.com",
  projectId: "getmeat-2023",
  storageBucket: "getmeat-2023.appspot.com",
  messagingSenderId: "248367979555",
  appId: "1:248367979555:web:77f745acff99682178a596",
  measurementId: "G-KZKCS5TP7B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
