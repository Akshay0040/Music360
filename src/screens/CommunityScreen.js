import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const friends = [
  { name: 'Music360', avatar: require('../assets/ab.jpeg') },
  { name: 'Kiki’s Drum', avatar: require('../assets/listen.jpeg') },
  { name: 'Sade', avatar: require('../assets/rb.jpeg') },
];

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={20} color="#fff" />
        <Text style={styles.title}>Friends</Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#aaa" />
        <TextInput
          placeholder="Friends, Artists, Influencers"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filters}>
        {['Discover', 'Friends', 'Followers', 'Following'].map((f, i) => (
          <TouchableOpacity key={i} style={[styles.filterButton, i === 0 && styles.activeFilter]}>
            <Text style={[styles.filterText, i === 0 && styles.activeFilterText]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>People you may know</Text>
      <FlatList
        data={friends}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.friendName}>{item.name}</Text>
            <Feather name="check-circle" color="#6495ED" size={16} style={{ marginLeft: 8 }} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221224',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b0e1e',
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    gap: 10
  },
  searchInput: {
    color: '#fff',
    flex: 1,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#2e2e2e',
  },
  activeFilter: {
    backgroundColor: '#F9A825',
  },
  filterText: {
    color: '#aaa',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#000',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
});

export default CommunityScreen;
