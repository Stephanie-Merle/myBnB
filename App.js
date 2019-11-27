import React, { useState, useEffect } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ListScreen from "./containers/ListScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SettingsScreen from "./containers/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("Token", token);
    } else {
      AsyncStorage.removeItem("Token");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const Token = await AsyncStorage.getItem("token");
      setIsLoading(false);
      setUserToken(Token);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationNativeContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator>
        {isLoading ? (
          // Checking for the token..
          <Stack.Screen name="Splash" component={() => null} />
        ) : userToken === null ? (
          // No token found, user isn't signed in
          <Stack.Screen name="SignIn" options={{ header: () => null }}>
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
        ) : (
          // User is signed in
          <Stack.Screen name="Tab" options={{ header: () => null }}>
            {() => (
              <Tab.Navigator
                // navigation tab on the bottom of the screen
                screenOptions={({ route }) => {
                  return {
                    tabBarIcon: ({ color, size }) => {
                      let iconName;
                      if (route.name === "Settings") {
                        iconName = `ios-options`;
                      } else {
                        iconName = `ios-home`;
                      }
                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    title: route.name === "undefined" ? "Home" : route.name
                  };
                }}
                // Setting up bottom navigation bar colors
                tabBarOptions={{
                  activeTintColor: "#85C5D3",
                  inactiveTintColor: "gray",
                  style: {
                    backgroundColor: "white"
                  }
                }}
              >
                <Tab.Screen>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="List"
                        options={{
                          title: "Mon AirBnB",
                          headerStyle: {
                            backgroundColor: "#85C5D3"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20
                          }
                        }}
                      >
                        {() => <ListScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          headerStyle: {
                            backgroundColor: "#85C5D3"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20
                          }
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
