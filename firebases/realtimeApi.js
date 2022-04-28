import { getDatabase, onValue, ref } from "firebase/database";
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
