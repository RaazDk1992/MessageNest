import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { Controller } from 'react-hook-form';
import Colors from '../assets/Colors';

const MNinput = ({ control, name, rules, placeholder, label, secureTextEntry, error, customstyles }) => {
    const [isFocused, setIsFocused] = useState(false); // Track focus state

    return (
        <View style={styles.container}>
            {label && (
                <Text
                    style={[
                        styles.label,
                        isFocused ? { color: Colors.bg_primary } : { color: '#aaa' } // Change color on focus
                    ]}
                >
                    {label}
                </Text>
            )}
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            customstyles || {},
                            isFocused ? styles.focusedInput : styles.defaultInput, // Border color based on focus
                            error && styles.errorInput,
                        ]}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        onBlur={() => {
                            setIsFocused(false);
                            onBlur(); // Call onBlur from react-hook-form
                        }}
                        onFocus={() => setIsFocused(true)} // Set focus to true when the input is focused
                        onChangeText={onChange} // Correctly bind onChange to react-hook-form
                        value={value || ''} // Ensure value is a string
                    />
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width:'100%'
    },
    label: {
        position: 'absolute',
        top: 0, // Position it right above the input
        left: 10,
        fontSize: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        zIndex: 1,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 5, // Reduce margin between label and input
    },
    defaultInput: {
        borderColor: '#ccc', // Grey border by default
    },
    focusedInput: {
        borderColor: Colors.bg_primary, // Active color when focused
    },
    errorInput: {
        borderColor: '#b00020', // Red border when error occurs
    },
    errorText: {
        color: '#b00020',
        marginBottom: 10,
    },
});

export default MNinput;
