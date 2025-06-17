import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const categories = ['Pop', 'Hip Hop', 'Lo Fi', 'Jazz', 'R&B', 'Int’l'];

const CategoriesScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>music360</Text>
      <Text style={styles.heading}>Select at least 3 categories you'd like to listen to</Text>

      <View style={styles.categoryGrid}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryBox}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
    fontSize: 25,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBox: {
    backgroundColor: '#343434',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    width: '47%',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 23,
  },
});

export default CategoriesScreen;
