import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import ItemScreen from "screens/ItemScreen";

const App = () => {
  return (
    <PaperProvider>
      <ItemScreen />
    </PaperProvider>
  );
};

export default App;
