// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CommunityScreen from '../screens/CommunityScreen';
import FeedScreen from '../screens/FeedScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MessagesScreen from '../screens/MessagesScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Community" component={CommunityScreen} />
    <Stack.Screen name="Feed" component={FeedScreen} />
    <Stack.Screen name="Player" component={PlayerScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

export default AppNavigator; 
