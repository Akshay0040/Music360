// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/FeedScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MessagesScreen from '../screens/MessagesScreen';
import CommunityScreen from '../screens/CommunityScreen';
import BottomNav from '../components/BottomNav'; 

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNav {...props} />} 
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Player" component={PlayerScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
