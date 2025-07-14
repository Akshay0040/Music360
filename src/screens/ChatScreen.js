import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showSuccessToast, showErrorToast } from '../toast/showToast';

const ChatScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const scrollRef = useRef();
    const [message, setMessage] = useState('');

    const handleSend = () => {
        const trimmed = message?.trim();
        if (trimmed?.length > 0) {
            showSuccessToast('Message Sent!', 'Your message was sent successfully');
            setMessage('');
        } else {
            showErrorToast('Empty Message', 'Please type something before sending.');
        }
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Works fine with SafeAreaInsets
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, justifyContent: 'space-between'  }}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="arrow-back" size={24} color="#fff" />
                            </TouchableOpacity>
                            <View style={styles.logoRow}>
                                <View style={styles.logoCircle}>
                                    <MaterialCommunityIcons name="music" size={30} color="#000" />
                                </View>
                                <Text style={styles.logoText}>Music360</Text>
                                <MaterialCommunityIcons
                                    name="check-decagram"
                                    size={18}
                                    color="#fff"
                                    style={{ marginLeft: 4 }}
                                />
                            </View>
                            <Feather name="more-vertical" size={22} color="#fff" />
                        </View>

                        {/* Chat ScrollView */}
                        <ScrollView
                            ref={scrollRef}
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                        >
                            {/* Receiver */}
                            <View style={styles.messageRow}>
                                <View style={styles.logoCircleSmall}>
                                    <MaterialCommunityIcons name="music" size={20} color="#000" />
                                </View>
                                <View style={styles.receiverMessage}>
                                    <Text style={styles.receiverText}>
                                        This package makes it super easy to create apps responsive that work perfectly on all different screen sizes in React Native.
                                        lfdngalhgaol  ajoiakenf lka od
                                    </Text>
                                </View>
                            </View>

                            {/* Sender */}
                            <View style={styles.messageRowRight}>
                                <View style={styles.senderMessage}>
                                    <Text style={styles.senderText}>Hi Everyone.</Text>
                                </View>
                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                                    style={styles.avatar}
                                />
                            </View>

                            {/* Song message */}
                            {/* <View style={styles.messageRowRight}>
                                <View style={styles.senderMessage}>
                                    <Text style={styles.senderText}>
                                        Hey! I'm listening to Beat It by Michael Jackson. What do you think?
                                    </Text>
                                    <Image
                                        source={{ uri: 'https://i.ytimg.com/vi/oRdxUFDoQe0/maxresdefault.jpg' }}
                                        style={styles.thumbnail}
                                    />
                                    <View style={styles.musicInfoBox}>
                                        <Text style={styles.songTitle}>Beat It</Text>
                                        <Text style={styles.artistName}>Michael Jackson</Text>
                                    </View>
                                </View>
                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                                    style={styles.avatar}
                                />
                            </View> */}
                        </ScrollView>

                        {/* Input Area */}
                        <View style={[
                            styles.inputWrapper,
                            {
                                paddingBottom: Platform.OS === 'android' ? 10 : insets.bottom + 10,
                            }
                            ]}>
                            <View style={styles.textInputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Type your message"
                                    placeholderTextColor="#888"
                                    value={message}
                                    onChangeText={setMessage}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={true}
                                    onFocus={() => {
                                        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={handleSend}
                            >
                                <Feather name="send" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1b0e1e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop: 50,
        marginBottom: 25,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    logoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoCircleSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    messagesContainer: {
        padding: 16,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    receiverMessage: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        maxWidth: '80%',
        flexShrink: 1,
    },
    receiverText: {
        color: '#000',
    },
    messageRowRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 15,
    },
    senderMessage: {
        backgroundColor: '#2e65ff',
        borderRadius: 12,
        padding: 12,
        maxWidth: '75%',
        flexShrink: 1,
    },
    senderText: {
        color: '#fff',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 8,
    },
    thumbnail: {
        width: 200,
        height: 100,
        borderRadius: 10,
        marginTop: 8,
    },
    musicInfoBox: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        marginTop: 4,
    },
    songTitle: {
        fontWeight: 'bold',
        color: '#000',
    },
    artistName: {
        color: '#555',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1b0e1e',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textInputBox: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    input: {
        fontSize: 16,
        color: '#000',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#ffa500',
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        marginTop: 7,
    },
});

export default ChatScreen;