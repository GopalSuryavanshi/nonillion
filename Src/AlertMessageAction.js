import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AlertMessageAction({ Title, modalVisible, setModalVisible, screenName }) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
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
              <View>
                <Text style={styles.titleText}>
                  {Title}
                </Text>
              </View>

              <View style={styles.buttonContainer}>

                {!screenName&&
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.okButton}>Ok</Text>
                </TouchableOpacity>
}
                {screenName && (
                  <TouchableOpacity onPress={() => {
                    setModalVisible(false);
                    navigation.navigate(screenName);
                  }}>
                    <Text style={styles.navigateButton}>Go to Screen</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  titleText: {
    marginBottom: 20,
    color: '#000000',
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  okButton: {
    borderRadius: 20,
    fontWeight: '800',
    fontSize: 15,
    backgroundColor: '#961702',
    color: 'white',
    padding: 5,
    paddingHorizontal: 45,
  },
  navigateButton: {
    borderRadius: 20,
    fontWeight: '800',
    fontSize: 15,
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 5,
    paddingHorizontal: 45,
  },
});

export default AlertMessageAction;
