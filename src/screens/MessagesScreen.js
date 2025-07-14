import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const messagesData = [
  {
    id: '1',
    name: 'Hassan',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'yesterday',
    unreadCount: 3,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

const MessagesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Recent');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageCard}
      onPress={() => navigation.navigate('Chat')}>

      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.time}>{item.time}</Text>

        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Recent' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Recent')}
          activeOpacity={0.6}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Recent' && styles.activeTabText,
            ]}
          >
            Recent
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Friends' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Friends')}
          activeOpacity={0.6}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Friends' && styles.activeTabText,
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
      </View>


      {/* Music360 Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="music" size={70} color="#000" />
        </View>
        <View style={styles.logoTextRow}>
          <Text style={styles.logoText}>Music360</Text>
          <MaterialCommunityIcons name="check-decagram" size={20} color="#bbb" style={{ marginLeft: 4 }} />
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messagesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b0e1e',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: 10,
    marginBottom: 25,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    // gap: 5,
  },
  tabButton: {
    height: 40,
    width: 85,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#5C5C5C',
  },
  tabText: {
    color: '#bbb',
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#ffa500',
    borderColor: '#ffa500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
  },
  // inactiveTab: {
  //   backgroundColor: '#171717',
  //   height: 40,
  //   width: 85,
  //   borderRadius: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 10,
  //   borderWidth: 1,
  //   borderColor: '#5C5C5C',
  // },
  // inactiveTabText: {
  //   color: '#bbb',
  //   fontWeight: '500',
  //   fontSize: 18,
  // },
  logoContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  logoCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  logoTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: '#bbb',
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 10,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b0e1e',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#bbb',
    fontSize: 13,
    marginTop: 4,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 45,
  },
  time: {
    color: '#bbb',
    fontSize: 12,
  },
  unreadBadge: {
    backgroundColor: '#ffa500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MessagesScreen;
