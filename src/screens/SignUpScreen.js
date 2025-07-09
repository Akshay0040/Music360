// Final Pro-Level Signup Screen with SignIn-like styling
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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
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
    if (event.type === 'dismissed') return;
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
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email');
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
    }else if (! dateRegex.test(birthday)) {
      setBirthdayError('Date must be in YYYY-MM-DD format');
      isValid = false;
    }

    if (!isValid) return;

    const newUser = { email, username, password, birthday };

    try {
      const storedData = await AsyncStorage.getItem('userList');
      const users = storedData ? JSON.parse(storedData) : [];
      const isExist = users.some(u => u.username === username || u.email === email);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* Top Section */}
            <View style={styles.topContent}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>
                  music<Text style={styles.logoHighlight}>360</Text>
                </Text>
                <Text style={styles.subLogo}>Music + Social</Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.heading}>Create Account</Text>
                <Text style={styles.text}>Enter the following information to create a new account</Text>
              </View>

              {/* Input Fields */}
              <Text style={styles.errorText}>{emailError}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={20} color="#ffffff" style={styles.icon} />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={email}
                  onChangeText={text => {
                    setEmail(text.toLowerCase());
                    setEmailError('');
                  }}
                />
              </View>

              <Text style={styles.errorText}>{usernameError}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="#ffffff" style={styles.icon} />
                <TextInput
                  placeholder="Enter your username"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={username}
                  onChangeText={text => {
                    setUsername(text);
                    setUsernameError('');
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
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                />
              </View>

              <Text style={styles.errorText}>{birthdayError}</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <FontAwesome name="calendar" size={20} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
                
                <TextInput
                  placeholder="Date of Birth"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={birthday}
                  editable={true}
                  onChangeText={(text) => {
                    setBirthday(text);
                    setBirthdayError('');
                  }}
                  // keyboardType='numeric'
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <FontAwesome name="caret-down" size={20} color="#aaa" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            {/* Button & Footer */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={{ color: '#FFFFFF' }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={{ color: '#FFA500', fontWeight: 'bold' }}>Sign In</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  button: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 120,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 35,
    // marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default SignUpScreen;
