import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { getUserData } from "./auth";

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

function createNewCard(columnRef, title, content = "") {
  return addDoc(collection(db, "cards"), {
    title,
    content,
    column: columnRef,
  });
}

function getCards(columnRef) {
  const q = query(collection(db, "cards"), where("column", "==", columnRef));
  return getDocs(q);
}

function getCard(cardId) {
  return getDoc(doc(db, "cards", cardId));
}

function editCardTitle(cardId, title) {
  return updateDoc(doc(db, "cards", cardId), {
    title,
  });
}

function editCardContent(cardId, content) {
  return updateDoc(doc(db, "cards", cardId), {
    content,
  });
}

function moveCardToNewColumn(cardRef, newColumnRef) {
  return updateDoc(cardRef, {
    column: newColumnRef,
  });
}

export { getDoc, updateDoc, createNewBoard, getUserBoard, createNewColumn, editColumnName, createNewCard, getCards, getCard, editCardTitle, editCardContent, moveCardToNewColumn };