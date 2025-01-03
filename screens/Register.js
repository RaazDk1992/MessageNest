import * as React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import app_logo from '../assets/images/logo-with-name.png';
import Colors from '../assets/Colors';
import MNinput from '../utility/MNinput';
import { useForm } from 'react-hook-form';
import Api from '../utility/Api';

const Register = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        Api.post("/api/auth/register",data).then((response)=>{})
        .catch((error)=>{})
        .finally((error)=>console.log(error));
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Display logo */}
                <Image source={app_logo} style={styles.logo} />
                <Card style={styles.login_card}>
                    <View style={styles.cardTitleWrapper}>
                        <Card.Title
                            title="Register"
                            titleStyle={styles.cardTitleText}
                        />
                    </View>
                    <Card.Content>
                        <MNinput
                            control={control}
                            name="firstName"
                            label="First Name"
                            placeholder="First Name"
                            rules={{ required: 'First Name is required' }}
                            error={errors.firstname?.message}
                        />
                        <MNinput
                            control={control}
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            rules={{ required: 'Last Name is required' }}
                            error={errors.lastname?.message}
                        />
                        <MNinput
                            control={control}
                            name="username"
                            label="Username"
                            placeholder="your username EX: Jon_Doe"
                            rules={{ required:false }}
                            error={errors.username?.message}
                        />
                        <MNinput
                            control={control}
                            name="email"
                            label="E-mail"
                            placeholder="yourmail@email.com"
                            rules={{ required: 'E-mail is required' }}
                            error={errors.email?.message}
                        />
                        <MNinput
                            control={control}
                            name="password"
                            label="Password"
                            placeholder="******"
                            secureTextEntry={true}
                            rules={{ required: 'Password is required' }}
                            error={errors.password?.message}
                        />
                        <MNinput
                            control={control}
                            name="password_confirm"
                            label="Password Confirmation"
                            placeholder="Re-enter your password again"
                            secureTextEntry={true}
                            rules={{ required: 'Password confirmation is required' }}
                            error={errors.password_confirm?.message}
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
                        <Button icon="chevron-left" onPress={() => navigation.navigate('login')}>
                            Back To Login
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, // Add some spacing for aesthetics
    },
    login_card: {
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3, // Adds shadow for elevation
    },
    logo: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 20,
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
    buttonContent: {
        paddingVertical: 8,
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Register;
