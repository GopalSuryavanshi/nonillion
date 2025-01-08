import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Confirmation</Text>
          <Text style={styles.modalMessage}>Are you sure you want to delete this item?</Text>
          


          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',borderWidth:0,width:"100%" }}>
                           
                           <TouchableOpacity  onPress={onConfirm}> 
                           <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#961702', color: 'white', padding: 5, paddingHorizontal: 35 }}>OK</Text>
   
                               </TouchableOpacity>
                              <TouchableOpacity  onPress={onCancel}>
                               <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#CCCCCC', color: '#961702', padding: 5, paddingHorizontal: 35, }}>
                                   CANCEL</Text>
   
                                   </TouchableOpacity>
                           </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalMessage: {
    marginVertical: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#961702',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;
