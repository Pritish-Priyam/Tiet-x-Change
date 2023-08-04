// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4FXfbxJv-TlC9x1uJB0GJreWD4mVDLTY",
  authDomain: "tiet-xchange.firebaseapp.com",
  databaseURL: "https://tiet-xchange-default-rtdb.firebaseio.com",
  projectId: "tiet-xchange",
  storageBucket: "tiet-xchange.appspot.com",
  messagingSenderId: "1004582697239",
  appId: "1:1004582697239:web:0da95e5e445380e1db1f52",
  measurementId: "G-PJVCVLPZ4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
export  {auth,database,storage};
