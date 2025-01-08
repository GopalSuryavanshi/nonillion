import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useMyContext } from './MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

function Logouticon() {
  const [modalVisible, setModalVisible] = useState(false);
  const { updateState } = useMyContext();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('LoginState');
      updateState({});
      setModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error clearing login state:', error);
    }
  };

  return (
    <>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuItem}>
      <Image source={require("./assets/Menu/Logout.png")}></Image>
        <Text style={styles.menuText}>Log out</Text>
      </TouchableOpacity>


     

   {modalVisible&&   <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontWeight: '700', marginBottom: 20 }}>
                Come back soon!
              </Text>
              <Text style={{ marginBottom: 20, color: '#000000', fontSize: 18, alignSelf: 'center' }}>
                Are you sure you want to logout?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={{ borderRadius: 20, fontWeight: '800', fontSize: 15, backgroundColor: '#961702', color: 'white', padding: 5, paddingHorizontal: "10%"}}>
                    LOG OUT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ borderRadius: 20, fontWeight: '800', fontSize: 15, backgroundColor: '#CCCCCC', color: '#961702', padding: 5, paddingHorizontal: "10%" }}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 340, // Customize the width as needed
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  }, menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#000',
    fontSize: 8,
    marginTop: 5,
  },
});

export default Logouticon;
