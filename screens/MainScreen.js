import * as React from "react";
import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeScreen";
import AddItemScreen from "./AddItemScreen";

const Tab = createBottomTabNavigator();

const MusicRoute = () => <Text>Account</Text>;

const MainScreen = ({ navigation }) => {
  const route = [
    { key: "home", name: "Home", title: "Home", icon: "home-circle" },
    { key: "item", name: "AddItem", title: "Item", icon: "plus-circle" },
    { key: "account", name: "Me", title: "Me", icon: "account-circle" },
  ];

  const screenDict = {
    home: HomeScreen,
    item: AddItemScreen,
    account: MusicRoute,
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {route.map((item, idx) => (
        <Tab.Screen
          key={idx}
          name={item.name}
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
