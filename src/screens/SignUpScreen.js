import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (event.type === 'dismissed') {
      return;
    }

    if (selectedDate) {
      setDate(selectedDate);
      const formatted = selectedDate.toISOString().split('T')[0];
      setBirthday(formatted);
    }
  };

  const handleSignUp = async () => {
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setBirthdayError('');

    let isValid = true;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid lowercase email');
      isValid = false;
    }

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

    if (!birthday.trim()) {
      setBirthdayError('Birthday is required');
      isValid = false;
    }

    if (!isValid) return;

    const newUser = { email, username, password, birthday };

    try {
      const storedData = await AsyncStorage.getItem('userList');
      let users = storedData ? JSON.parse(storedData) : [];

      const isExist = users.some(
        (u) => u.username === username || u.email === email
      );
      if (isExist) {
        setUsernameError('Username or Email already exists');
        return;
      }

      users.push(newUser);
      await AsyncStorage.setItem('userList', JSON.stringify(users));
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error saving user data:', error);
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
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.text}>
          Enter the following information to create a new account
        </Text>
      </View>

      <View style={{marginTop: -20,}}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.errorText}>
            {emailError ? emailError : ''}
          </Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text.toLowerCase());
                setEmailError('');
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.errorText}>
            {usernameError ? usernameError : ''}
          </Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setUsernameError('');
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.errorText}>
            {passwordError ? passwordError : ''}
          </Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Enter Password"
              secureTextEntry
              placeholderTextColor="#ccc"
              style={styles.input}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.errorText}>
            {birthdayError ? birthdayError : ''}
          </Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="calendar" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Date of Birth"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={birthday}
              onChangeText={(text) => {
                setBirthday(text);
                setBirthdayError('');
              }}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <FontAwesome name="caret-down" size={20} color="#ccc" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
    backgroundColor: '#221224',
    flexGrow: 1,
    padding: 20,
    paddingTop: 110
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
    marginBottom: -9,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 20,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 140,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
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
    minHeight:16,
  },
});

export default SignUpScreen;
