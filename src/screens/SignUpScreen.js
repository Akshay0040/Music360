import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.logo}>music360</Text>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.text}>Enter the following information to create a new account</Text>

            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    placeholder="Enter Password"
                    secureTextEntry
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="calendar" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    placeholder="Birthday"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <Text style={{ color: '#FFFFFF' }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ color: '#FFA500' }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C003B',
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logo: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    heading: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 10,
    },
    text: {
        color: '#FFFFFF',
        marginBottom: 20,
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#343434',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        color: '#fff',
    },
    button: {
        backgroundColor: '#FFA500',
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 23,
    },
    linkContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default SignUpScreen;
