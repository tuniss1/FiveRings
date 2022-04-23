import app from "./firebaseApp";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";

const firestore = getFirestore();

export const getUserInfo = async (userId = "Okamhmcb9spC8XrLA721") => {
  const userRef = doc(firestore, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such user document!");
  }
};

export const createNewUser = async (userInfos) => {
  try {
    await setDoc(doc(firestore, "users", userInfos.userId), {
      userId: userInfos.userId,
      username: userInfos.name,
      email: userInfos.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const existsUser = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    return userDoc.exists();
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    const currentUser = await getDoc(doc(firestore, "users", uid));
    // console.log(currentUser.data());
    return currentUser.data();
  } catch (error) {
    console.log(error);
  }
};

export const signOutFunction = async () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};
