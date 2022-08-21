import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

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
    board: boardRef,
  });
  return userCredential;
}

function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function logout() {
  return signOut(auth);
}

function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

function getUserData(userUid) {
  return getDoc(doc(db, 'users', userUid));
}

function createNewBoard(userUid, name) {
  return addDoc(collection(db, "boards"), {
    name,
    author: userUid,
    columns: [],
  });
}

async function getUserBoard(userUid) {
  const userSnapshot = await getUserData(userUid);
  const userData = userSnapshot.data();
  return await getDoc(userData.board);
}

async function createNewColumn(boardRef, name) {
  const columnRef = await addDoc(collection(db, "columns"), {
    name,
  });
  await updateDoc(boardRef, {
    columns: arrayUnion(columnRef),
  });
  return columnRef;
}

function editColumnName(columnRef, name) {
  return updateDoc(columnRef, {
    name,
  });
}

export default firebase;
export { auth, db, getDoc, getParsedFirebaseError, createNewAccount, login, logout, onUserStateChanged, getUserData, getUserBoard, createNewColumn, editColumnName };