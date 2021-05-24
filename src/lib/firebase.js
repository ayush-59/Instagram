import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//import the seed file here
//import { seedDatabase } from "../seed.js";

//Enter the config of your app
const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//run this command only once
//seedDatabase(firebase);

export { firebase, FieldValue };
