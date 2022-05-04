import {
  getDatabase,
  onValue,
  ref,
  push,
  update,
  child,
} from "firebase/database";
import app from "./firebaseApp";

const database = getDatabase();

export const updateControl = ({ id, mode }) => {
  const controlRef = ref(database, `user/nam/control/${id}`);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = { mode: mode };

  return update(controlRef, updates);
};
