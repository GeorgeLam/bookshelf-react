// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgoIS28QpA9CQYcQVh2U19HUqBK1qvKHI",
  authDomain: "bookshelf-284401.firebaseapp.com",
  databaseURL: "https://bookshelf-284401.firebaseio.com",
  projectId: "bookshelf-284401",
  storageBucket: "bookshelf-284401.appspot.com",
  messagingSenderId: "964097279567",
  appId: "1:964097279567:web:177f6faf5611bd80e48c3a",
  measurementId: "G-Q2JDE37Y4G",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();