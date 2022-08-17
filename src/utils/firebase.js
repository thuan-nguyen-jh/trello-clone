import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);

function formatErrorMessage(message) {
  message = message.replaceAll('-', ' ');
  return message.charAt(0).toUpperCase() + message.slice(1);
}

function throwParsedError(error) {
  const [key, message] = error.code.split('/');
  throw new Error(formatErrorMessage(message), { key });
}

async function createNewAccount(email, password, name, position) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      position,
    });
  } catch (error) {
    throwParsedError(error);
  }
}

async function login(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throwParsedError(error);
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throwParsedError(error);
  }
}

function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

export default firebase;
export { auth, db, createNewAccount, login, logout, onUserStateChanged };