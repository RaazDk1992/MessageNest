import React, { useState } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import Colors from '../assets/Colors';

const MNinput = ({ control, name, rules, placeholder,label , secureTextEntry, error, customstyles }) => {
    const [isFocused, setIsFocused] = useState(false); // Track focus state

    return (
        <>
            {label && <Text>{label}</Text>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            customstyles||{},
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
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop:10,
        marginBottom:5
    },
    defaultInput: {
        borderColor: '#ccc', // Grey border by default
    },
    focusedInput: {
        borderColor: Colors.bg_primary, // Red border when focused
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
