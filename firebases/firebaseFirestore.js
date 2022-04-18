import { getFirestore, doc, getDoc } from "firebase/firestore";

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
