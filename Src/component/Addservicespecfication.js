import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddSpecificationForm from './AddSpecificationForm';

const AddServiceSpecification = ({fetchdata}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={50} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
          <Text style={{color:"#961702",fontSize:22,fontWeight:700}}>Specification Name</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={{maxHeight:500}}>
            <AddSpecificationForm setModalVisible={setModalVisible} data={fetchdata}></AddSpecificationForm>
            </View>
                     </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingRight: 20,
  },
  addButton: {
    backgroundColor: '#961702',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Optional: for a darkened background
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,

  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#961702',
    padding: 2,
    borderRadius: 25,
    bottom:30 },
});

export default AddServiceSpecification;
