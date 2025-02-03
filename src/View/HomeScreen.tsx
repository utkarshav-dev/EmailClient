/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Icon, { Icons } from '../contant/icons';
import MainContainer from '../component/MainContainer';
import SearchBox from '../component/SearchBox';

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused == true) {
      loadDrafts();
    }
  }, [isFocused]);
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState({});
  const [drafts, setDrafts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const assignedColors = {};

    // Function to fetch emails
  const loadDrafts = async () => {
    setLoading(true);
    try {
      let drafts = await AsyncStorage.getItem('emailsList');
      drafts = drafts ? JSON.parse(drafts) : [];
      setDrafts(drafts);
      setLoading(false);
      console.log(drafts);
    } catch (error) {
      setLoading(false);
      console.error('Error loading drafts:', error);
    }
  };
  const colorsPool = [
    'rgba(207, 66, 193, 1)',
    'rgba(36, 160, 237, 1)',
    'rgba(236, 173, 12, 1)',
    '#BBDEFB',
    'rgba(16, 145, 153, 1)',
    '#B2EBF2',
    'rgba(255, 99, 71, 1)',
    'rgba(75, 0, 130, 1)',
    'rgba(210, 180, 140, 1)',
    'rgba(60, 179, 113, 1)',
    'rgba(255, 165, 0, 1)',
    'rgba(220, 20, 60, 1)',
    'rgba(138, 43, 226, 1)',
    'rgba(188, 143, 143, 1)',
    'rgba(0, 206, 209, 1)',
    'rgba(255, 105, 180, 1)',
    'rgba(255, 140, 0, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(75, 192, 192, 1)',
  ];
  useEffect(() => {
    setFilteredData(
      drafts.filter(
        (item) =>
          item.recipient.toLowerCase().includes(searchText.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, drafts]);

  // Function to handle Search
  const handleSearch = (text) => {
    setSearchText(text);
  };

  // Function to open menu
  const openMenu = () => setShowMenu(true);

  // Function to close menu
  const closeMenu = () => setShowMenu(false);

  // Function to handle logout
  const handleLogout = async () => {
    Alert.alert('', 'Are you sure you want to logout?', [
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.clear();  
          loadDrafts();
          setShowMenu(false);
        },
      },
      {
        text: 'No',
        onPress: () => closeMenu(),
      },
    ]);
  };
  return (
    <MainContainer Loading={Loading}>
      <View style={styles.container}>
        <SearchBox
          placeholder={'Search in emails'}
          behavior={'position'}
          value={searchText}
          placeholderTextColor={'black'}
          onChangeText={handleSearch}
          onOpenMenu={openMenu}
        />
        {filteredData.length > 0 ? (
          <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const initials = item.recipient ? item.recipient.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2) : '';
            const colorIndex = assignedColors[initials] || 0;
            const color = colorsPool[(colorIndex + index) % colorsPool.length];
            assignedColors[initials] = colorIndex + 1;
            return (<>

              <TouchableOpacity style={styles.EmailContainer} onPress={() => navigation.navigate('EditEmailScreen', { draft: item })}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={[styles.circle, { backgroundColor: color, marginRight: 20 }]}>
                    <Text style={styles.itemText}>{initials}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '85%' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <Text numberOfLines={2} style={styles.subtxt}>{item.subject}</Text>
                        <Text style={[styles.status, item.status === 'Sent' ? styles.sent : styles.draft]}>
                          {item.status}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.rectxt}>{item.recipient}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {/* )} */}
            </>);
          }
          }
        />
        ):(<View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color:'black', opacity: 0.6 }}>No emails found</Text>       
        </View>)}
        
        <TouchableOpacity
          onPress={() => navigation.navigate('EditEmailScreen')}
          style={{
            position: 'absolute', bottom: '5%', right: '7%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', height: 50, borderRadius: 15, elevation: 7, flexDirection: 'row', padding: 12
          }}>
          <Icon type={Icons.MaterialCommunityIcons} name={'pencil-outline'} color={'white'} size={22} />
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500', marginLeft: 5 }}>Compose</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={showMenu} animationType="fade" onRequestClose={closeMenu}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItemContainer} onPress={handleLogout}>
              <Icon type={Icons.AntDesign} name="logout" size={20} color="gray" />
              <Text style={styles.menuItem}>Log out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  draftItem: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, elevation: 2, },
  subject: { fontSize: 16, fontWeight: 'bold' },
  recipients: { fontSize: 14, color: 'gray' },
  status: { fontSize: 12, marginTop: 5, padding: 5, borderRadius: 5, textAlign: 'center', width: 50 },
  draft: { backgroundColor: '#ffcc00', color: '#000' },
  sent: { backgroundColor: '#28a745', color: '#fff' },
  EmailContainer: {marginBottom: 15, alignItems: 'center', backgroundColor: 'white', width: '97%', borderRadius: 15, padding: 10, marginVertical: 5, marginLeft: 5, elevation: 7, shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8,},
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontWeight: '800',
    fontSize: 24,
    color: 'white',
    lineHeight: 60,
    textAlignVertical: 'center',
  },
  subtxt: { fontWeight: '700', fontSize: 16, color: 'black', width: '60%' },
  rectxt: { fontWeight: '500', fontSize: 12, color: 'grey' },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  menuContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginRight: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  menuItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: 'gray',
    marginLeft: 8,
  },
});

export default HomeScreen;
