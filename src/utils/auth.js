import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { createNewBoard } from "./db";

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

export { createNewAccount, login, logout, onUserStateChanged, getUserData };
