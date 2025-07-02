// // src/screens/ForgotPasswordScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { firebaseAuth } from '../firebaseConfig';

// const ForgotPasswordScreen = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handlePasswordReset = async () => {
//     setMessage('');
//     setError('');

//     if (!email) {
//       setError('Please enter your email.');
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(firebaseAuth, email);
//       setMessage('📬 Reset link sent! Please check your email inbox.');
//     } catch (err) {
//       console.log('Error Code:', err.code);
//       console.log('Full Error:', err);

//       if (err.code === 'auth/user-not-found') {
//         setError('No user found with this email.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('Invalid email format.');
//       } else {
//         setError('Something went wrong. Please try again.');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         placeholderTextColor="#aaa"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
//         <Text style={styles.buttonText}>Send Reset Link</Text>
//       </TouchableOpacity>

//       {message ? <Text style={styles.success}>{message}</Text> : null}
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 30,
//     backgroundColor: '#1C003B',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 26,
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#343434',
//     color: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#FFA500',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   success: {
//     marginTop: 15,
//     color: 'lightgreen',
//     textAlign: 'center',
//   },
//   error: {
//     marginTop: 15,
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// export default ForgotPasswordScreen;
