import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCpMw6SP0LGB9VQzk_aNai1eJQoihNXhnc",
    authDomain: "gita-backend.firebaseapp.com",
    projectId: "gita-backend",
    storageBucket: "gita-backend.appspot.com",
    messagingSenderId: "713480024619",
    appId: "1:713480024619:web:714b80e7d0f1d9dfd9b06e",
    databaseURL: 'https://gita-backend-default-rtdb.asia-southeast1.firebasedatabase.app/',
    storageBucket: 'gs://gita-backend.appspot.com',
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };