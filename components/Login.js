import * as React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import app_logo from '../assets/images/logo-with-name.png';
import Colors from '../assets/Colors';

const Login = () => {
    return (
        <View style={styles.container}>
            <Image source={app_logo} style={styles.logo} />
            <Card style={styles.login_card}>
                <View style={styles.cardTitleWrapper}>
                    <Card.Title 
                        title="Login" 
                        titleStyle={styles.cardTitleText} 
                    />
                </View>
                <Card.Content>
                    <Text>dfdf</Text>
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
        borderRadius: 10, // Ensure the card itself has rounded corners
        overflow: 'hidden', // Ensures child content respects the card's borderRadius
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
        fontWeight:'bold'
    },
});

export default Login;
