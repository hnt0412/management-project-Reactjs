// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiKFpts9x4l45EPz6gVKX9A385OaFusF4",
  authDomain: "chat-app-f88d5.firebaseapp.com",
  projectId: "chat-app-f88d5",
  storageBucket: "chat-app-f88d5.appspot.com",
  messagingSenderId: "891432558922",
  appId: "1:891432558922:web:a42158e2c83b10d943e1b3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.Timestamp
export { projectFirestore, auth, storage, timestamp }