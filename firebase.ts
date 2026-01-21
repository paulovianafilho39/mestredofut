
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração oficial do seu projeto MESTRE DO FUT (mestredofut1-c441a)
const firebaseConfig = {
  apiKey: 'AIzaSyBc7X6KaAgk5YUvtojnTZGgZFIU5H3LXLg',
  authDomain: 'mestredofut1-c441a.firebaseapp.com',
  projectId: 'mestredofut1-c441a',
  storageBucket: 'mestredofut1-c441a.firebasestorage.app',
  messagingSenderId: '842043545781',
  appId: '1:842043545781:web:2680d4af7c639fe2a046fc'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
