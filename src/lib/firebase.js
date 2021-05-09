import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//import the seed file here
//import { seedDatabase } from "../seed.js";

const config = {
  apiKey: "AIzaSyAXCH4Ts2lcrkxd00XHk_UWHlMwVYUdCM0",
  authDomain: "instagram-ad4e5.firebaseapp.com",
  projectId: "instagram-ad4e5",
  storageBucket: "instagram-ad4e5.appspot.com",
  messagingSenderId: "9972677049",
  appId: "1:9972677049:web:0081ab57f8d5004a4f5e68",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//run this command only once
//seedDatabase(firebase);

export { firebase, FieldValue };
