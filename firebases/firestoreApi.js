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
import { getAuth } from "firebase/auth";

const firestore = getFirestore();
const storage = getStorage();

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
    return currentUser.data();
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageAsync = async (userId, uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const userAvatarRef = ref(storage, `avatars/${userId}.jpg`);
  const result = await uploadBytes(userAvatarRef, blob, {
    contentType: "image/jpeg",
  });
  blob.close();
  return getDownloadURL(userAvatarRef);
};

export const updateUserAvatar = async (imgUrl, userId) => {
  const userRef = doc(firestore, "users", userId);
  await updateDoc(userRef, {
    userAvatar: imgUrl,
  });
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
