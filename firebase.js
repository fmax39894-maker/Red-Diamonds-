import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
query,
orderBy,
addDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ---------------- FIREBASE CONFIG ----------------

const firebaseConfig={

apiKey: "AIzaSyBBGeeIgjaPMhaUinuu2Gs3UCXt4P4Iazk",
  authDomain: "red-diamonds-3fc24.firebaseapp.com",
  projectId: "red-diamonds-3fc24",
  storageBucket: "red-diamonds-3fc24.firebasestorage.app",
  messagingSenderId: "377556759682",
  appId: "1:377556759682:web:31f1a4b7cb6402268bf09b",

};

// ---------------- INITIALIZE ----------------

const app=initializeApp(firebaseConfig);

const db=getFirestore(app);

// ---------------- COLLECTION ----------------

const materialsRef=collection(db,"materials");

// Always return documents ordered by the "order" field
const materialCollection=query(
materialsRef,
orderBy("order")
);

// ---------------- EXPORT ----------------

export{
db,
materialsRef,
materialCollection,
addDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot
};