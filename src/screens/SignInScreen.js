import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';


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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          music
          <Text style={styles.logoHighlight}>360</Text>
        </Text>
        <Text style={styles.subLogo}>Music + Social</Text>
      </View>


      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.text}>Enter your existing username and password</Text>
      </View>

      <View style={{marginTop: -15,}}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.errorText}>
            {usernameError ? usernameError : ''}
          </Text>
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
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text style={styles.errorText}>
            {passwordError ? passwordError : ''}
          </Text>
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
        </View>
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

      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In </Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password?</Text>

      <View style={styles.linkContainer}>
        <Text style={{ color: '#FFFFFF' }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: '#FFA500', fontWeight: 'bold' }}>Sign Up </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221224',
    flexGrow: 1,
    padding: 20,
    paddingTop: 110,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 39,
  },
  logo: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '900',
  },
  logoHighlight: {
    color: '#2471F2',
    textShadowColor: '#FF4500',
  },
  subLogo: {
    color: '#FFA500',
    fontSize: 12,
    marginTop: -6,
    marginLeft: 140,
  },
  titleContainer: {
    marginBottom: 35,
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
    marginBottom: -5,
  },
  icon: {
    marginRight: 15,
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
    marginLeft: 8,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
  },
  forgot: {
    color: '#FFA500',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
  },
  linkContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    // marginBottom: 5,
    marginLeft: 10,
    minHeight: 16,
  },
});

export default SignInScreen;
