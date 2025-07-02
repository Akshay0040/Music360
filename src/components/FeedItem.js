import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CommentSection from './CommentSection';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const FeedItem = ({ post, onLike, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const getPostImage = (fileName) => {
    switch (fileName) {
      case 'post1.jpg':
        return require('../assets/post1.jpg');
      case 'post2.jpg':
        return require('../assets/post2.jpg');
      default:
        return require('../assets/post.jpg');
    }
  };

  const getUserImage = (fileName) => {
    switch (fileName) {
      case 'user1.jpg':
        return require('../assets/user1.jpg');
      case 'user2.jpg':
        return require('../assets/user2.jpg');
      default:
        return require('../assets/post.jpg');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={getPostImage(post.media)} style={styles.image} />

      {/* Profile & Caption */}
      <View style={styles.captionContainer}>
        <View style={styles.captionHeader}>
          <Image source={getUserImage(post.userImage)} style={styles.captionProfileImage} />
          <Text style={styles.username}>{post.username}</Text>
        </View>

        <Text style={styles.caption}>
          {showFullCaption
            ? post.caption + ' '
            : post.caption.split(' ').slice(0, 5).join(' ') + (post.caption.split(' ').length > 5 ? ' ' : '')
          }
          {post.caption.split(' ').length > 5 && (
            <Text
              onPress={() => setShowFullCaption(!showFullCaption)}
              style={styles.moreText}
            >
              {showFullCaption ? '...less' : '...more'}
            </Text>
          )}
        </Text>

        {/* 🎵 Music Line */}
        <Text style={styles.musicText}>
          🎵 {post.username} - {post.music ? post.music : 'Original Audio'}
        </Text>
      </View>



      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLike} style={styles.iconWrapper}>
          <FontAwesome
            name={post.liked ? 'heart' : 'heart-o'}
            size={28}
            color={post.liked ? 'red' : '#fff'}
          />
          <Text style={styles.iconText}>{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowComments(true)} style={styles.iconWrapper}>
          <Feather name="message-circle" size={28} color="#fff" />
          <Text style={styles.iconText}>{post.comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <Feather name="send" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <Feather name="more-vertical" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.userImageBox}>
          <Image
            source={getUserImage(post.userImage)}
            style={styles.userIcon}
          />
        </View>
      </View>

      {/* Comments Modal */}
      <Modal visible={showComments} animationType="slide" transparent={true}>
        <CommentSection
          comments={post.comments}
          onClose={() => setShowComments(false)}
          onSend={(text) => {
            onAddComment(text); 
          }}
        />
      </Modal>
    </View>
  );
};

export default FeedItem;

const wp = (p) => (width * p) / 100;
const hp = (p) => (height * p) / 100;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000',
  },
  image: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },

  // ✅ Caption Section
  captionContainer: {
    position: 'absolute',
    bottom: hp(12),
    left: wp(3),
    right: wp(20),
    flexDirection: 'column',
  },
  captionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  captionProfileImage: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: wp(2),
  },
  username: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  caption: {
    color: '#fff',
    fontSize: wp(3.6),
  },
  moreText: {
    // color: '#F9A825',
    fontSize: wp(3.5),
    fontWeight: '600',
    marginTop: 2,
  },
  musicText: {
    color: '#ccc',
    fontSize: wp(3.4),
    marginTop: 4,
  },

  // ✅ Action Buttons (Right side)
  actions: {
    position: 'absolute',
    right: wp(4),
    bottom: hp(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(25),
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  iconText: {
    color: '#fff',
    fontSize: wp(3.2),
    marginTop: 2,
    textAlign: 'center',
  },

  // ✅ Bottom most user icon
  userImageBox: {
    marginTop: hp(1),
    alignItems: 'center',
  },
  userIcon: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2), // square but slightly rounded
    borderWidth: 1,
    borderColor: '#fff',
  },
});
