// database/firebaseDb.js

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyALRLGPq-6W_54DN3TUpU8MgKH_HiYQxzc",
  authDomain: "cook-up-49e88.firebaseapp.com",
  databaseURL: "https://cook-up-49e88-default-rtdb.firebaseio.com/",
  projectId: "cook-up-49e88",
  messagingSenderId: "735083038682",
  appId: "1:735083038682:android:2b7a3fb1bd578413ea62e3",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
