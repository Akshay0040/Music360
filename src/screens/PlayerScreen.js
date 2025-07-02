import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../components/BottomNav';

const PlayerScreen = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={styles.text}>Player Screen</Text>
    </View>
    <BottomNav />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1b0e1e',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PlayerScreen;
