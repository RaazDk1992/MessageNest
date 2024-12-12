import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, Text, Button } from 'react-native-paper';
import Login from './components/Login';


const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Login/>
      </SafeAreaView>
    </PaperProvider>
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
