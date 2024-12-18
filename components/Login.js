import * as React from 'react';
import { Image, View, StyleSheet, TouchableOpacity,Text} from 'react-native';
import {  Button, Card, PaperProvider } from 'react-native-paper';
import app_logo from '../assets/images/logo-with-name.png';
import Colors from '../assets/Colors';
import MNinput from '../utility/MNinput'; 
import { useForm } from 'react-hook-form'; 
import Api from '../utility/Api';
import { jwtDecode } from 'jwt-decode';
import * as SecuredStorage from 'expo-secure-store';
import { useTimeCapsuleContext } from '../utility/ContextApi';

const Login = ({navigation}) => {
    const { control, handleSubmit, formState: { errors } } = useForm(); 
    const{token,setToken,currentUser,setCurrentUser} = useTimeCapsuleContext();

    const loginHandler = async(data) => {
    

        const response =  Api.post("/api/auth/login",data)
        .then((response)=>{
            console.log(response);
            if(response.status ===200 && response.data.jwtToken){
                setToken(response.data.jwtToken.trim());
                SecuredStorage.setItem("_token",response.data.jwtToken.trim());
                const decoded = jwtDecode(response.data.jwtToken);
                const user = decoded?.sub
                if (user){
                    const userd ={ "username": decoded.sub};
                    SecuredStorage.setItem("current_user",JSON.stringify(userd));
                    setCurrentUser(JSON.stringify(userd));
                }
            }
        })
        .catch((err)=>console.log(err.response?.data));
        
    };

    return (
        
        <PaperProvider>
            <View style={styles.container}>
            {/* Display logo */}
            <Image source={app_logo} style={styles.logo} />
            
            {/* Card Component */}
            <Card style={styles.login_card}>
                <View style={styles.cardTitleWrapper}>
                    <Card.Title 
                        title="Login" 
                        titleStyle={styles.cardTitleText} 
                    />
                </View>
                <Card.Content>
                    {/* Display error message if the input is invalid */}

                    {/* MNinput Field for username */}
                    <MNinput
                        control={control}  // Control from react-hook-form
                        name="username"  // Field name
                        label="Username"
                        placeholder="Username"  // Placeholder text
                        rules={{ required: 'Username is required' }}  // Validation rule
                        error={errors.username?.message}  // Error message to display if any
                    />


                        {/* MNinput Field for username */}
                        <MNinput
                            control={control}  // Control from react-hook-form
                            name="password"  // Field name
                            label="password"
                            placeholder="******"  // Placeholder text
                            secureTextEntry={true}
                            rules={{ required: 'password is required' }}  // Validation rule
                            error={errors.password?.message}  // Error message to display if any
                        />

                        <Button
                            mode="contained"
                            onPress={handleSubmit(loginHandler)}
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                            buttonColor={Colors.bg_primary}
                        >
                            Submit
                        </Button>


                        <TouchableOpacity onPress={()=>navigation.navigate('register')} ><Text style={{marginTop:10, fontWeight:'bold', color:Colors.bg_primary}}> No Account?,Register</Text></TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login_card: {
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    logo: {
        width: '29%',
        height: '10%',
        resizeMode: 'contain',
    },
    cardTitleWrapper: {
        backgroundColor: Colors.bg_primary,
        padding: 5,
    },
    cardTitleText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    button_style:{
        backgroundColor:Colors.bg_primary,
        color:'white',
        fontWeight:'bold'
    }
});

export default Login;
