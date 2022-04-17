import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeScreen";

const Tab = createMaterialBottomTabNavigator();

const MusicRoute = () => <Text>Account</Text>;

const AlbumsRoute = () => <Text>Schedule</Text>;

const RecentsRoute = () => <Text>Notification</Text>;

const MainScreen = () => {
  const route = [
    { key: "home", title: "Home", icon: "home-outline" },
    { key: "schedule", title: "Schedule", icon: "calendar-blank" },
    { key: "notification", title: "Notification", icon: "bell-outline" },
    { key: "account", title: "Account", icon: "account-outline" },
  ];

  const screenDict = {
    home: HomeScreen,
    schedule: AlbumsRoute,
    notification: RecentsRoute,
    account: MusicRoute,
  };

  return (
    <Tab.Navigator>
      {route.map((item) => (
        <Tab.Screen
          name={item.name}
          component={screenDict[item.key]}
          options={{
            tabBarLabel: item.name,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={item.icon}
                color={color}
                size={26}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainScreen;
