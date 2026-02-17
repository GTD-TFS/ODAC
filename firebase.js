// firebase.js — inicialización única Firebase (cliente)
// Importar SIEMPRE desde los HTML con: import { db, auth, serverTimestamp } from "./firebase.js";

import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDUG_T31JEWDK9x_apUZVHwriWnjurNrms",
  authDomain: "denupol.firebaseapp.com",
  projectId: "denupol",
  storageBucket: "denupol.firebasestorage.app",
  messagingSenderId: "691472437659",
  appId: "1:691472437659:web:2cdd59082976841d7d513e"
};

// App NOMBRADA (evita que se “cuelen” otras apps inicializadas en la misma página)
const APP_NAME = "denupol";
export const app = getApps().some(a => a.name === APP_NAME)
  ? getApp(APP_NAME)
  : initializeApp(firebaseConfig, APP_NAME);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Re-export directo
export { serverTimestamp };