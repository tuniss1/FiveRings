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

export const getLatLng = async () => {
  const addrRef = ref(database, "user/nam/sensor/1");
  return onValue(
    ref(database, addrRef),
    (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    },
    {
      onlyOnce: true,
    }
  );
};

export const updateControl = ({ id, mode }) => {
  const controlRef = ref(database, `user/nam/control/${id}`);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = { mode: mode };

  return update(controlRef, updates);
};
