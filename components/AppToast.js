import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const AppToast=({text1,text2,type})=>{

    return(<View style={styles.container}>
        <LottieView
        source={require('./../assets/lotty/sent-02.json')}
        autoPlay/>
    </View>);

}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default AppToast;