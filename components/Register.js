import * as React from 'react';
import { Image, View, StyleSheet, TouchableOpacity,Text} from 'react-native';
import {  Button, Card } from 'react-native-paper';
import app_logo from '../assets/images/logo-with-name.png';
import Colors from '../assets/Colors';
import MNinput from '../utility/MNinput'; 
import { useForm } from 'react-hook-form'; 

const Register = ({navigation}) => {
    const { control, handleSubmit, formState: { errors } } = useForm(); 

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        
    };

    return (
        <View style={styles.container}>
            {/* Display logo */}
            <Image source={app_logo} style={styles.logo} />
            
            {/* Card Component */}
            <Card style={styles.login_card}>
                <View style={styles.cardTitleWrapper}>
                    <Card.Title 
                        title="Regiser" 
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
                            onPress={handleSubmit(onSubmit)}
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                            buttonColor={Colors.bg_primary}
                        >
                            Submit
                        </Button>


                        <TouchableOpacity onPress={()=>navigation.navigate('login')} ><Text>Back to Login</Text></TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
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

export default Register;
