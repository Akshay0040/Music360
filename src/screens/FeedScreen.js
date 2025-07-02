import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import FeedItem from '../components/FeedItem';
import BottomNav from '../components/BottomNav';
import feedData from '../data/feedData.json';

const { height } = Dimensions.get('window');

const FeedScreen = () => {
  const [data, setData] = useState(feedData);

  const handleLike = (postId) => {
    const updated = data.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    );
    setData(updated);
  };

  const handleAddComment = (postId, commentText) => {

    const updated = data.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              username: 'Michael Jackson',
              text: commentText,
              time: 'Just now',
              likes: 0,
              avatar: 'https://i.pravatar.cc/150?img=3'
            },
          ],
        }
        : post
    );
    setData(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={({ item }) => (
            <FeedItem
              post={item}
              onLike={() => handleLike(item.id)}
              onAddComment={(text) => {
                handleAddComment(item.id, text);
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          snapToInterval={height}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEnabled={false}
        />

        <View style={styles.bottomNavContainer}>
          <BottomNav />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1c1b1e',
    zIndex: 999,
    elevation: 20,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

});
