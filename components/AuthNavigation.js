import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import Home from './Home';

const AuthNavigation = () => {
  const Stack = createStackNavigator();
  
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name='feeds' component={Home}/>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
