import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "./HomeScreen";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const MainScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Home", icon: "home-outline" },
    { key: "albums", title: "Schedule", icon: "calendar-blank" },
    { key: "recents", title: "Notification", icon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainScreen;
