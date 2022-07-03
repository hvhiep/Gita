import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpMw6SP0LGB9VQzk_aNai1eJQoihNXhnc",
  authDomain: "gita-backend.firebaseapp.com",
  databaseURL: "https://gita-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gita-backend",
  storageBucket: "gita-backend.appspot.com",
  messagingSenderId: "713480024619",
  appId: "1:713480024619:web:714b80e7d0f1d9dfd9b06e"
};
  //https://gita-backend.asia-southeast1.firebaseio.com
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const database = initializeFirestore(app, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
})

export { auth, db, storage, database };