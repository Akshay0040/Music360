import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Alert, Animated, ImageBackground, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const categoryData = [
  { label: 'R&B', image: require('../assets/getty.jpg') },
  { label: 'Intn’l', image: require('../assets/getty2.jpg') },
  { label: 'Pop', image: require('../assets/gettyimage.jpg') },
  { label: 'Hip Hop', image: require('../assets/abc.jpg') },
  { label: 'Lo Fi', image: require('../assets/images.jpeg') },
  { label: 'Jazz', image: require('../assets/rb.jpeg') },
  { label: 'Sony', image: require('../assets/download.jpeg') },
  { label: 'Best', image: require('../assets/xyz.jpeg') },
];

const CategoriesScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const scaleAnimations = useRef(categoryData.map(() => new Animated.Value(1))).current;

  useFocusEffect(
    React.useCallback(() => {
      setSelectedCategories([]);
    }, [])
  );

  const toggleCategory = (category, index) => {
    const isSelected = selectedCategories.includes(category);
    const newScale = isSelected ? 1 : 1.05;

    Animated.spring(scaleAnimations[index], {
      toValue: newScale,
      useNativeDriver: true,
    }).start();

    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length >= 3) {
        Alert.alert(
          'Limit Reached',
          'You can select up to 3 genres only.',
          [
            {
              text: 'OK',
              onPress: () => {
                setSelectedCategories([]);
                scaleAnimations.forEach((anim) => anim.setValue(1));
              },
            },
          ],
          { cancelable: false }
        );
        return;
      }
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length < 1) {
      Alert.alert('Select Genre', 'Please select at least one genre.');
      return;
    }
    navigation.navigate('Home', { selectedCategories });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            music
            <Text style={styles.logoHighlight}>360</Text>
          </Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.heading}>
            Select at least 3 genres you’d like to listen to
          </Text>
        </View>

        <View style={styles.categoryGrid}>
          {categoryData.map((item, index) => {
            const isSelected = selectedCategories.includes(item.label);
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => toggleCategory(item.label, index)}
              >
                <Animated.View
                  style={[
                    styles.categoryBox,
                    {
                      transform: [{ scale: scaleAnimations[index] }],
                      borderColor: isSelected ? '#F59E0B' : 'transparent',
                      borderWidth: isSelected ? 2 : 0,
                    },
                  ]}
                >
                  <ImageBackground
                    source={item.image}
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <Text style={styles.categoryText}>{item.label}</Text>
                  </ImageBackground>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>

      <TouchableWithoutFeedback onPress={handleContinue}>
        <View style={styles.fixedButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CategoriesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221224',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 120, 
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
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
  titleContainer: {
    marginBottom: 25,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBox: {
    width: '48%',
    height: 140,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

