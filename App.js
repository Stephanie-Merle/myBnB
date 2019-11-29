import React, { useState, useEffect } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ListScreen from "./containers/ListScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import MapScreen from "./containers/MapScreen";
import ProfileScreen from "./containers/ProfileScreen";
import UploadPicture from "./containers/UploadPicture";

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
          <>
            <Stack.Screen name="SignIn" options={{ header: () => null }}>
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{
                headerStyle: {
                  backgroundColor: "#85C5D3"
                },
                headerTitleStyle: {
                  color: "white",
                  fontSize: 20
                }
              }}
            >
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
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
                      } else if (route.name === "Map") {
                        iconName = `ios-map`;
                      } else if (route.name === "Profile") {
                        iconName = `ios-contact`;
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
                <Tab.Screen name="Map">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Map"
                        options={{
                          title: "Map",
                          headerStyle: {
                            backgroundColor: "#85C5D3"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20
                          }
                        }}
                      >
                        {() => <MapScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Profile">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                          headerStyle: {
                            backgroundColor: "#85C5D3"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20
                          }
                        }}
                      >
                        {() => <ProfileScreen setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Camera"
                        options={{
                          title: "Camera",
                          headerStyle: {
                            backgroundColor: "#85C5D3"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20
                          }
                        }}
                      >
                        {() => <UploadPicture setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                          headerStyle: {
                            backgroundColor: "#85C5D3"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20
                          }
                        }}
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
