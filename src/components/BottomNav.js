import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useNavigationState } from '@react-navigation/native';


const tabs = [
  { icon: 'home', label: 'Home', lib: 'FontAwesome5' },
  { icon: 'find', label: 'Feed', lib: 'AntDesign' },
  { icon: 'compact-disc', label: 'Player', lib: 'FontAwesome5' },
  { icon: 'comment-dots', label: 'Messages', lib: 'FontAwesome5' },
  { icon: 'users', label: 'Community', lib: 'Feather' },
];

const BottomNav = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const currentTab = useNavigationState((state) => {
    const mainTabs = state.routes.find((r) => r.name === 'MainTabs')?.state;
    if (mainTabs) {
      return mainTabs.routes[mainTabs.index].name;
    }
    return state.routes[state.index].name;
  });

  const handlePress = (label) => {
    if (label !== currentTab) {
      navigation.navigate('MainTabs', {
        screen: label,
      });
    }
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNavRow}>
          {tabs.map((item, i) => {
            const isActive = currentTab === item.label;
            const color = isActive ? '#F9A825' : '#fff';

            const IconComponent =
              item.lib === 'Feather'
                ? Feather
                : item.lib === 'AntDesign'
                  ? AntDesign
                  : FontAwesome5;

            return (
              <View style={styles.navBox} key={i}>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => handlePress(item.label)}
                >
                  <IconComponent name={item.icon} size={22} color={color} />
                  <Text style={[styles.navLabel, { color }]}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1c1b1e', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden', 
    elevation: 15,
    zIndex: 100,
  },
  bottomNavContainer: {
    backgroundColor: '#1c1b1e',
    paddingVertical: 10,
    width: '100%',
  },
  bottomNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBox: {
    flex: 1,
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default BottomNav;