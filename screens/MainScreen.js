import * as React from "react";
import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

const MusicRoute = () => <Text>Account</Text>;

const AlbumsRoute = () => <Text>Schedule</Text>;

const RecentsRoute = () => <Text>Notification</Text>;

const MainScreen = ({ navigation }) => {
  const route = [
    { key: "home", title: "Home", icon: "home-circle" },
    { key: "item", title: "AddItem", icon: "plus-circle" },
    { key: "account", title: "Me", icon: "account-circle" },
  ];

  const screenDict = {
    home: HomeScreen,
    item: RecentsRoute,
    account: MusicRoute,
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {route.map((item, idx) => (
        <Tab.Screen
          key={idx}
          name={item.title}
          component={screenDict[item.key]}
          options={{
            tabBarLabel: item.title,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={item.icon}
                color={color}
                size={32}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainScreen;
