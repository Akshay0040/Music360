import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Animated,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
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

    navigation.navigate('MainTabs', {
      screen: 'Home',
      params: { selectedCategories },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            music<Text style={styles.logoHighlight}>360</Text>
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
                      borderColor: isSelected ? '#FFA500' : 'transparent',
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

      <TouchableOpacity style={styles.fixedButton} onPress={handleContinue} >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
    paddingTop: 70,
    paddingBottom: 130,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '900',
  },
  logoHighlight: {
    color: '#2471F2',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
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
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 50,
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
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
