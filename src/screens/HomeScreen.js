import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // ✅ Add this

const HomeScreen = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets(); 

  const selectedCategories = route.params?.selectedCategories || [];
  const [selectedTab, setSelectedTab] = useState('Music');

  const justForYou = [
    { title: 'Daily Mix', subtitle: 'aljfh', image: require('../assets/download.jpeg') },
    { title: "Feelin' Myself", subtitle: 'oiahodf', image: require('../assets/getty.jpg') },
    { title: 'Mood Booster', subtitle: 'ksdflsh', image: require('../assets/rb.jpeg') },
  ];

  const popular = [
    { title: 'Top Hits', subtitle: 'Best of today', image: require('../assets/getty2.jpg') },
    { title: 'Retro Vibes', subtitle: 'Old is gold', image: require('../assets/images.jpeg') },
    { title: 'Party Time', subtitle: 'Let’s dance!', image: require('../assets/xyz.jpeg') },
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={2} ellipsizeMode="tail">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ backgroundColor: '#221224' }}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }} // ✅ respect BottomNav height + safe area
      >
        {/* Header & Search */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={18} color="#aaa" style={styles.searchIcon} />
            <TextInput
              placeholder="Artists, Songs, Albums, and more"
              placeholderTextColor="#aaa"
              style={styles.searchInput}
            />
          </View>
          <View style={styles.avatar} />
        </View>

        {/* Promo Banner */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View style={styles.textContainer}>
              <Text style={styles.promoText}>Get 25% off on all Music</Text>
              <TouchableOpacity style={styles.referButton}>
                <Text style={styles.referButtonText}>Refer a friend</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/A_day.png')}
              style={styles.promoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['Music', 'Artist', 'Store'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sections */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>Just for you</Text>
          <FlatList
            horizontal
            data={justForYou}
            keyExtractor={(item, index) => `just-${index}`}
            renderItem={renderCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />

          <Text style={styles.sectionTitle}>Popular</Text>
          <FlatList
            horizontal
            data={popular}
            keyExtractor={(item, index) => `pop-${index}`}
            renderItem={renderCard}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.floatingButton, { bottom: 80 + insets.bottom }]}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221224',
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#180D1A',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
    paddingVertical: 6,
    borderWidth: .1,
    borderColor: '#aaa'
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: '#888',
    marginTop: -11,
  },
  promoCard: {
    margin: 20,
    backgroundColor: '#E6E6FA',
    borderRadius: 15,
    padding: 15,
    height: 150,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  promoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 20,
  },
  promoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    width: 100,
  },
  referButton: {
    backgroundColor: '#1F51FF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  referButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tabs: {
    flexDirection: 'row',
    paddingLeft: 11,
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#5C5C5C',
  },
  activeTabButton: {
    backgroundColor: '#F59E0B',
  },
  tabText: {
    color: '#aaa',
    fontSize: 18,
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 20,
  },
  flatListContent: {
    paddingRight: 8,
  },
  card: {
    width: 140,
    marginRight: 15,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  cardTextContainer: {
    flex: 1,
    paddingLeft: 6,
    gap: 4,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 16,
  },
  floatingButton: {
    position: 'absolute',
    // bottom: 0,
    right: 20,
    backgroundColor: '#3B82F6',
    width: 60,
    height: 60,
    borderRadius: 29.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: '700',
    marginTop: -5,
  },
});

export default HomeScreen;
