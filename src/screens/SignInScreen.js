// import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';


const SignInScreen = ({ navigation }) => {
    const [rememberMe, setRememberMe] = useState(false);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.logo}>music360</Text>

            <Text style={styles.heading}>Sign In</Text>
            <Text style={styles.text}>Enter your existing username and password</Text>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    placeholder="Enter your username"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    placeholder="Enter Password"
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />
            </View>

            <View style={styles.rememberMeContainer}>
                <CheckBox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    tintColors={{ true: '#FFA500', false: '#ccc' }}
                />
                <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Categories')}>
                <Text style={styles.buttonText}> Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.forgot}>Forgot Password?</Text>

            <View style={styles.linkContainer}>
                <Text style={{ color: '#FFFFFF' }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ color: '#FFA500' }}>Sign Up</Text>
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
        fontSize: 12
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
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        color: '#fff',
        marginLeft: 8,
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
        fontSize: 23
    },
    forgot: {
        color: '#FFA500',
        textAlign: 'center',
        margin: 20,
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

export default SignInScreen;
