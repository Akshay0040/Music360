import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSignIn = async () => {
    setUsernameError('');
    setPasswordError('');
    setLoginError('');
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const storedData = await AsyncStorage.getItem('userList');
      const users = storedData ? JSON.parse(storedData) : [];

      const matchedUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (matchedUser) {
        if (rememberMe) {
          await AsyncStorage.setItem('savedUsername', username);
          await AsyncStorage.setItem('savedPassword', password);
        } else {
          await AsyncStorage.removeItem('savedUsername');
          await AsyncStorage.removeItem('savedPassword');
        }
        navigation.navigate('Categories');
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (e) {
      console.error(e);
      setLoginError('Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.topContent}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>
                music<Text style={styles.logoHighlight}>360</Text>
              </Text>
              <Text style={styles.subLogo}>Music + Social</Text>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.heading}>Sign In</Text>
              <Text style={styles.text}>
                Enter your existing username and password
              </Text>
            </View>

            <Text style={styles.errorText}>{usernameError}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#ffffff" style={styles.icon} />
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setUsernameError('');
                  setLoginError('');
                }}
              />
            </View>

            <Text style={styles.errorText}>{passwordError}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#ffffff" style={styles.icon} />
              <TextInput
                placeholder="Enter Password"
                secureTextEntry
                placeholderTextColor="#aaa"
                style={styles.input}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError('');
                  setLoginError('');
                }}
              />
            </View>

            <View style={styles.rememberMeContainer}>
              <TouchableOpacity
                style={[styles.customCheckbox, rememberMe && styles.checkedBox]}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && <FontAwesome name="check" size={14} color="#fff" />}
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>

            <View style={styles.loginErrorBox}>
              {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.forgot}>Forgot Password?</Text>
          </View>

          {/* BOTTOM CONTENT */}
          <View style={styles.linkContainer}>
            <Text style={{ color: '#FFFFFF' }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ color: '#FFA500', fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#221224',
    padding: 20,
    paddingTop: 70,
  },
  topContent: {
    flexShrink: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logo: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '900',
  },
  logoHighlight: {
    color: '#2471F2',
  },
  subLogo: {
    color: '#FFA500',
    fontSize: 12,
    marginTop: -6,
    // alignSelf: 'flex-end',
    marginLeft: 140,
  },
  titleContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 29,
    color: '#fff',
    fontWeight: '600',
  },
  text: {
    color: '#fff',
    fontSize: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#180D1A',
    borderRadius: 10,
    borderColor: '#6B6B6A',
    borderWidth: 1,
    paddingHorizontal: 15,
    // marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    color: '#fff',
    fontSize: 17,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  customCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  rememberMeText: {
    color: '#fff',
    fontSize: 17,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  forgot: {
    color: '#FFA500',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
  },
  linkContainer: {
    // marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 35,
  },
  loginErrorBox: {
    minHeight: 20,
    marginBottom: 3,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default SignInScreen;
