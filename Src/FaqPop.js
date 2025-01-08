import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Modal from 'react-native-modal';
import HTMLView  from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialIcons';


const FaqPop = ({Q, answare}) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
        <TouchableOpacity onPress={toggleModal}>
          <View style={{display:"flex" ,flexDirection:"row"}}>
          <Icon name="visibility" size={18} color="#961702" />
       
       
        
        </View>
        
      </TouchableOpacity>
    <View style={styles.container}>
      

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={{color:'black',fontWeight:400}}>{Q}</Text>
          {/* <Text style={{color:'black',fontWeight:800}}>{answare}</Text> */}
          <HTMLView   value={answare}></HTMLView >
          <TouchableOpacity onPress={toggleModal}>
           
          </TouchableOpacity>
        </View>
      </Modal>
   
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin:10
  },
});

export default FaqPop;
