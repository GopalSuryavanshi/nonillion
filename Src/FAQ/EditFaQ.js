import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RichTextEditor from './RichTextEditor';
import {useMyContext} from '../MyContext';
import axios from 'axios';

const EditFaQ = ({Q, answare,ID,DataTable}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [question, setQ] = useState(Q);
  const [Answare, setAns] = useState(answare);
  const [msg, setmsg] = useState(false);
  const {LoginState, updateState} = useMyContext();
  const AccessToken = LoginState;

  const handleSubmitFaq = async () => {
    var access_TokenGlobal = '';
  

    try {
      access_TokenGlobal = AccessToken.Token;
    } catch {
      console.error('no token found');
    }

    try {
     
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_TokenGlobal}`,
      };

      const formData = {
        question: question,
        answer: Answare,
      };
      // Make a PUT request to your API endpoint
      const response = await axios.put(
        'https://api.aroundme.co.in/businessapp/Businessfaq/edit/' + ID + '/',
        formData,
        {headers},
      );
      // Handle the response
      console.log("okkkkkkkkkkkkk")
      setmsg(true);
      DataTable();
    } catch (error) {
      console.log("okkkkkkkkkkkkk"+error+access_TokenGlobal)
      // Handle errors
      setmsg(false);
    }
  };

  useEffect(() => {
    setmsg(false);
  }, [Answare,question]);

  return (
    <View style={{height: 25, width: 25}}>
      <TouchableOpacity onPress={toggleModal}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Icon name="edit" size={18} color="#961702" />
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
          style={styles.modal}>
          <View style={styles.modalContent}>
            <Text
              style={{
                color: '#961702',
                fontWeight: 600,
                fontSize: 18,
                padding: 5,
              }}>
              Update FAQ
            </Text>
            <Text
              style={{
                borderWidth: 0,
                borderRadius: 0,
                borderColor: '#B3B3B3',
                marginLeft: 10,
                marginRight: 10,
              }}>
              Question:
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
                borderRadius: 0,
                borderColor: '#B3B3B3',
                margin: 10,
              }} // Set height to 100 pixels
              value={question}
              onChangeText={Text => {
                setQ(Text);
              }}></TextInput>

            <RichTextEditor ans={Answare} setAnsware={setAns}></RichTextEditor>

            <TouchableOpacity
              onPress={() => handleSubmitFaq()}
              style={{
                backgroundColor: '#961702',
                borderRadius: 50,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 22,
                  padding: 5,
                }}>
                Update
              </Text>
            </TouchableOpacity>
            {/* <Text style={{color:'black',fontWeight:800}}>{answare}</Text> */}

         {msg&&   <Text style={{color:'#961702',fontWeight:600,fontSize:18,padding:5}}>Update successfully</Text> }
        
            <TouchableOpacity onPress={toggleModal}></TouchableOpacity>
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
    padding: 20,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
});

export default EditFaQ;
