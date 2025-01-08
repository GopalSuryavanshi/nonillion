import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Modal from 'react-native-modal';
import HTMLView  from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {  useMyContext, } from '../MyContext';


const DeleteFaQ = ({Q, answare,id,DataTable}) => {

    const { LoginState, updateState } = useMyContext();
  const [isModalVisible, setModalVisible] = useState(false);
 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const handleDelete = async (itemId) => {
    try {
      // Make a DELETE request to the API endpoint
      const response = await axios.delete(
        `https://api.aroundme.co.in/businessapp/Businessfaq/delete/${itemId}/`,
        {
          headers: {
            Authorization: `Bearer ${LoginState.Token}`,
          },
        }
      );
      
      // Handle the API response
     
      DataTable();
      toggleModal()
    } catch (error) {
      // Handle errors
      console.error("Error:", error);

      
    }
  };
  return (
    <View style={{borderWidth:0,height:25,width:25}}>
        <TouchableOpacity onPress={toggleModal}>
          <View style={{display:"flex" ,flexDirection:"row"}}>
         
        <Icon name="delete" size={18} color="#961702" />

       
        
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
                        <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{alignSelf:'center',fontSize:20,color:'#000000',fontWeight:'700',marginBottom:20}}>{"Confirm alert"}
                        </Text>
                        
                            <Text style={{marginBottom:20,color:'#000000',fontSize:18,alignSelf:'center'}}>
                              {Q}{JSON.stringify()}
                            </Text>
                       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                           
                        <TouchableOpacity  onPress={ ()=>{handleDelete(id);}}> 
                        <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#961702', color: 'white', padding: 5, paddingHorizontal: 45 }}>DELETE</Text>

                            </TouchableOpacity>
                           <TouchableOpacity  onPress={() => toggleModal()}>
                            <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#CCCCCC', color: '#961702', padding: 5, paddingHorizontal: 45 }}>
                                CANCEL</Text>

                                </TouchableOpacity>
                        </View>

                    </View>
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

export default DeleteFaQ;


