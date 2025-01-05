import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { ContextProvider } from './utility/ContextApi';
import AuthNavigation from './components/AuthNavigation';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Details from './screens/Details';

// Get screen height for responsiveness
const { height, width } = Dimensions.get('window');

const toastConfig = {
  
  customToast: ({ text1 ,props}) => {
    const[visibleText, setVisibleText] = useState(false);

    const iconSource = {
      success: require('./assets/lotty/success-anim.json'),
      fail: require('./assets/lotty/failed.json'),
      processing: require('./assets/lotty/lding.json'),
    };

    return (
      <View style={styles.customToastContainer}>
        <LottieView source={iconSource[props.eventType]||iconSource.success}
        autoPlay style={styles.icon_dim} 
        loop={props.eventType==='processing'}
        key={Math.random()}
        onAnimationFinish={()=>setVisibleText(true)}/>
        {visibleText && <Text style={styles.customToastText}>{text1 || 'Success!'}</Text>}
      </View>
    );
  },
};

const App = () => {
  return (
    // <ContextProvider>
    //   <NavigationContainer>
    //     <AuthNavigation />
    //     <Toast config={toastConfig} />
    //   </NavigationContainer>
    // </ContextProvider>
    <Details/>
  );
};

const styles = StyleSheet.create({
  customToastContainer: {
    flex:1,
    flexDirection:'column',
    position: 'absolute',
    top: '50%', // Positioned at 25% of screen height
    alignSelf: 'center', // Centers the toast horizontally
    width: '90%', // Takes 90% of the screen width
    height: height * 0.5, // Dynamic height based on screen height (50% of screen height)
    backgroundColor: 'rgba(255, 252, 252, 0.9)',
    borderRadius: 20,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    padding: 20,
    zIndex: 1000, // Ensures it appears above other content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds shadow on Android
  },
  customToastText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2874a6',
    textAlign: 'center',
  },

  icon_dim:{
    width:'50%',
    height:height*0.1
  }
});

export default App;
