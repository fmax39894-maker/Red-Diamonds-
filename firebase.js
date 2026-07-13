import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
addDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyCo_kxcIJ6fqSMxflzwEvvHyFvnJ8jy8Zk",
  authDomain: "red-diamonds.firebaseapp.com",
  projectId: "red-diamonds",
  storageBucket: "red-diamonds.firebasestorage.app",
  messagingSenderId: "692631450885",
  appId: "1:692631450885:web:48615bc50d5b25ec6a336c",

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const materialCollection = collection(db,"materials");

export{
db,
materialCollection,
getDocs,
addDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot
};