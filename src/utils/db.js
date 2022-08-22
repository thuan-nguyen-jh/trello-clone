import { addDoc, arrayUnion, collection, getDoc, updateDoc } from "firebase/firestore";
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

export { getDoc, createNewBoard, getUserBoard, createNewColumn, editColumnName };