import * as React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import app_logo from '../assets/images/logo-with-name.png';
import Colors from '../assets/Colors';
import MNinput from './MNinput'; 
import { useForm } from 'react-hook-form'; 

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm(); 

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        alert('Form submitted successfully!');
    };

    return (
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
                    {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

                    {/* MNinput Field for username */}
                    <MNinput
                        control={control}  // Control from react-hook-form
                        name="username"  // Field name
                        placeholder="Username"  // Placeholder text
                        rules={{ required: 'Username is required' }}  // Validation rule
                        error={errors.username?.message}  // Error message to display if any
                    />
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
});

export default Login;
