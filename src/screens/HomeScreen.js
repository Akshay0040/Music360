import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>music360</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#ccc"
          style={styles.input}
        />
      </View>

      <Text style={styles.heading}>Just for you</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}><Text style={styles.cardText}>Daily Mix</Text></View>
        <View style={styles.card}><Text style={styles.cardText}>Feelin’ Myself</Text></View>
        <View style={styles.card}><Text style={styles.cardText}>Mood</Text></View>
      </ScrollView>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#343434',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 30,
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
  heading: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#343434',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
