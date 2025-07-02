import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const CommentSection = ({ comments, onClose, onSend }) => {
  const [text, setText] = useState('');
  const [likedComments, setLikedComments] = useState({});

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  const toggleLike = (commentId) => {
    setLikedComments((prevState) => {
      const isLiked = prevState[commentId];
      return {
        ...prevState,
        [commentId]: !isLiked,
      };
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentBox}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.row}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <Text style={styles.reply}>Reply</Text>
      </View>
      <View style={styles.likeSection}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Icon
            name={likedComments[item.id] ? "heart" : "heart-outline"}
            size={18}
            color={likedComments[item.id] ? "red" : "gray"}
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>
          {item.likes + (likedComments[item.id] ? 1 : 0)}
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        onClose();
      }}
    >
      <View style={styles.container}>

        <View style={styles.dragHandle} />

          {/* Comments List */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatarSmall}
          />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Add a comment...."
            placeholderTextColor="#ccc"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <Icon name="arrow-up" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 10,
    paddingTop: 23,
    // alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    height: '50%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  dragHandle: {
  width:100,
  height: 5,
  backgroundColor: '#fff',
  borderRadius: 30,
  marginBottom: 18,
  alignSelf: 'center',
},
  commentBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize:18,
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  commentText: {
    color: '#ddd',
    marginVertical: 4,
  },
  reply: {
    color: '#0a84ff',
    fontSize: 13,
  },
  likeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  likeCount: {
    color: 'gray',
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#2c1b2f',
  borderRadius: 15,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginTop: 10,
  marginBottom: 16,
},

input: {
  flex: 1,
  color: '#fff',
  paddingVertical: 8,
  paddingHorizontal: 10,
  fontSize: 15,
},

sendBtn: {
  backgroundColor: '#fbbf24',
  borderRadius: 12,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 8,
},
});
