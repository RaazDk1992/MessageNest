import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, Text, Button } from 'react-native-paper';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './components/AuthNavigation';
import Home from './components/Home';
import { ContextProvider } from './utility/ContextApi';


const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
      
        <AuthNavigation/>
    
    </NavigationContainer>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
  },
});

export default App;
