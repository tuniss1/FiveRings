import { getDatabase, ref, update, set } from "firebase/database";
import app from "./firebaseApp";

const database = getDatabase();

export const updateControl = ({ id, mode }) => {
  const controlRef = ref(database, `user/nam/control/${id}`);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = { mode: mode };

  return update(controlRef, updates);
};

export const addItem = async ({ itemId, itemName }) => {
  const controlRef = ref(database, `user/nam/control/${itemId}`);
  const sensorRef = ref(database, `user/nam/sensor/${itemId}`);
  const initItemControl = await set(controlRef, {
    mode: 0,
  });
  const initItemSensor = await set(sensorRef, {
    id: parseInt(itemId),
    lat: -1,
    lng: -1,
    mode: 0,
    name: itemName,
  });
  return Promise.all([initItemControl, initItemSensor]);
};
