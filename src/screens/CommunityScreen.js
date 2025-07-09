import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import BottomNav from '../components/BottomNav';
import appData from '../data/appdata.json';

const filters = ['Discover', 'Friends', "Test", 'Followers', 'Following',];

const CommunityScreen = () => {
    const [activeFilter, setActiveFilter] = useState('Discover');
    const [filteredData, setFilteredData] = useState([]);
    const [noData, setNoData] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        loadFilteredData(activeFilter, searchText);
    }, [activeFilter, searchText]);

    const loadFilteredData = (filterKey, search = '') => {
        const key = filterKey.toLowerCase();
        const currentCategoryData = appData[key];

        // Agar searchText blank hai to sirf current filter ka data dikhaye
        if (search.trim().length === 0) {
            if (!currentCategoryData) {
                setFilteredData([]);
                setNoData(true);
            } else {
                setFilteredData(currentCategoryData);
                setNoData(currentCategoryData.length === 0);
            }
        } else {
            // Jab search likha gaya ho toh global search sab categories me karo
            let allData = [];
            for (const k in appData) {
                allData = allData.concat(appData[k]);
            }

            const filtered = allData.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            setFilteredData(filtered);
            setNoData(filtered.length === 0);
        }
    };


    const getAvatar = (name) => {
        switch (name) {
            case 'ab.jpeg': return require('../assets/ab.jpeg');
            case 'listen.jpeg': return require('../assets/listen.jpeg');
            case 'rb.jpeg': return require('../assets/rb.jpeg');
            case 'rb.jpeg': return require('../assets/rb.jpeg');
            case 'rb.jpeg': return require('../assets/rb.jpeg');
            case 'rb.jpeg': return require('../assets/rb.jpeg');
            case 'rb.jpeg': return require('../assets/rb.jpeg');
            default: return require('../assets/rb.jpeg');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Feather name="arrow-left" size={24} color="#fff" />
                <Text style={styles.title}>Friends</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <FontAwesome5 name="search" size={18} color="#aaa" style={styles.searchIcon} />
                <TextInput
                    placeholder="Friends, Artists, Influencers"
                    placeholderTextColor="#aaa"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />

                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                        <Feather name="x" size={10} color="#000000" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Filters */}
            {searchText.length === 0 && (
                <View style={styles.filterSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filters}
                    >
                        {filters.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setActiveFilter(filter)}
                                style={[
                                    styles.filterButton,
                                    activeFilter === filter && styles.activeFilter,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        activeFilter === filter && styles.activeFilterText,
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <View style={{ flex: 1 }}>
                {searchText.length === 0 && (
                    <Text style={styles.subtitle}>People you may know</Text>
                )}

                <View style={styles.friendListWrapper}>
                    {noData ? (
                        <Text style={styles.noDataText}>
                            No Data found 
                        </Text>
                    ) : (
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.friendItem}>
                                    <Image source={getAvatar(item.avatar)} style={styles.avatar} />
                                    <View style={styles.nameAndTickWrapper}>
                                        <Text style={styles.friendName}>{item.name}</Text>
                                        <Feather
                                            name="check-circle"
                                            size={16}
                                            style={styles.tickIcon}
                                        />
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </View>

            {/* <BottomNav /> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b0e1e',
        paddingTop: 70,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#180D1A',
        padding: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        borderWidth: .1,
        borderColor: '#aaa'
    },
    searchInput: {
        color: '#fff',
        marginLeft: 10,
        flex: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    clearButton: {
        backgroundColor: '#007BFF', // Bright blue
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    filterSection: {
        // marginHorizontal:10,
        marginBottom: 5,
        paddingLeft: 15,
    },
    filters: {
        flexDirection: 'row',
        paddingVertical: 3,
        paddingRight: 10,
        // marginBottom: 1,
        // marginHorizontal: 20,
    },
    filterButton: {
        backgroundColor: '#171717',
        height: 45,
        width: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#5C5C5C',
    },
    activeFilter: {
        backgroundColor: '#F9A825',
    },
    filterText: {
        color: '#aaa',
        fontWeight: '600',
        fontSize: 15,
    },
    activeFilterText: {
        color: '#000',
    },
    noDataText: {
        color: '#FF0000',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
    },

    subtitle: {
        color: '#aaa',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '500',
        marginHorizontal: 20,
        marginTop: 10,
    },
    friendListWrapper: {
        marginTop: 20,
        // flexDirection: 'row',
        // alignItems: 'center',
    },

    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: 20,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 12,
    },

    nameAndTickWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    friendName: {
        color: '#fff',
        fontSize: 16,
        maxWidth: 200,
    },

    tickIcon: {
        color: '#6495ED',
        marginLeft: 8,
        marginTop: 2,
    },

});

export default CommunityScreen;



