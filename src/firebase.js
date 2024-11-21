import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDiGllqen1VCoGJJmiTpAB0Usswjm8TyaM",
   authDomain: "fir-ii-b7dbe.firebaseapp.com",
   projectId: "fir-ii-b7dbe",
   storageBucket: "fir-ii-b7dbe.firebasestorage.app",
   messagingSenderId: "390166998904",
   appId: "1:390166998904:web:b76858bee67084b724e28d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Inicializa Firebase Authentication

// Exporta las funciones para crear usuarios, iniciar sesión y verificar autenticación
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged };