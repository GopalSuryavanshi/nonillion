import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';

const PlaystorePopup = ({data,action,setisUplate}) => {
  const [modalVisible, setModalVisible] = useState(action);

  const openPlayStore = () => {
    const appPackageName = 'com.business.aroundme.co.in'; // Replace with your app's package name
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${appPackageName}`;

    Linking.openURL(playStoreUrl).catch((err) =>
      Alert.alert('Error', 'Could not open the Play Store.')
    );
  };

  return (
    <View style={{}}>
     
     {action&& <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require("../assets/launcher.png")}
              style={styles.icon}
            />
            <Text style={styles.titleText}>New Version Available</Text>
            <Text style={styles.titleText2}>{"Aroundme Business"}</Text>
            
            <Text style={styles.messageText}>
             {data.message}
            </Text>

<View style={{flexDirection:"row",justifyContent:"space-around",borderWidth:0,width:"100%"}}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                openPlayStore(); // Call the function to open Play Store
              }}
            >
              <Text style={styles.continueButtonText}> Update ({data.Version})</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton2}
              onPress={() => {
                setisUplate(false);
                // openPlayStore(); // Call the function to open Play Store
              }}
            >
              <Text style={styles.continueButtonText2}> Update Later </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // Background color for the main view
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 320,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    bottom:50,
    width: 100,
    height: 100,
    marginBottom: 0,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:"#961702"
  },

  
  titleText2: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:"#000"
  },
  messageText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },

  messageText2: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#961702',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth:1
  },

  continueButton2: {
    borderColor:"#961702",
    borderWidth:1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueButtonText2: {
    color: '#961702',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PlaystorePopup;