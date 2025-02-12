import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import { useTimeCapsuleContext } from "../utility/ContextApi";
import { ActivityIndicator, View } from "react-native";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import Details from "../screens/Details";

const AuthNavigation = () => {
  const Stack = createStackNavigator();
  const { token, isLoading } = useTimeCapsuleContext();

  console.log(token);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={token ? "home" : "login"} // Navigate based on token availability
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="feeds" component={Home} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="home" component={TabNavigator}/>
      <Stack.Screen name="details" component={Details}/>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
