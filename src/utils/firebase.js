import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

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

function getParsedFirebaseError(error) {
  const [key, message] = error.code.split('/');
  return {
    key,
    message: formatErrorMessage(message),
  };
}

async function createNewAccount(email, password, name, position) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userUid = userCredential.user.uid;
  const boardRef = await createNewBoard(userUid, "");
  await setDoc(doc(db, 'users', userUid), {
    name,
    position,
    lastVisitBoard: boardRef.id,
  });
}

async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  await signOut(auth);
}

function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

async function createNewBoard(userUid, name) {
  return await addDoc(collection(db, "boards"), {
    name,
    members: [userUid],
  });
}

export default firebase;
export { auth, db, getParsedFirebaseError, createNewAccount, login, logout, onUserStateChanged };