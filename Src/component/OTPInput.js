import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMyContext } from '../MyContext';
import axios from 'axios';
import AlertMessage from '../AlertMessage';

const OTPInput = ({ correctOtp,MobileNo,EmailID,name,whatsappNo }) => {


   
    const { LoginState, updateState } = useMyContext();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isError, setIsError] = useState(false);

  const handleConfirmOtp = () => {

    // if (otp.join('') === correctOtp) {
    //     handleUpdateWhatsAppNumber(whatsappNo)
      
    //   setIsError(false);
    // } else {
    //   setOtp(Array(6).fill('')); // Clear all OTP inputs
    //   setIsError(true); // Trigger error state
    //   Alert.alert('Error', 'Invalid OTP. Please try again.');
    // }

    handleUpdateWhatsAppNumber(whatsappNo)



  };

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setIsError(false); // Reset error state when user starts typing
  };



  const handleUpdateWhatsAppNumber = async whatsappNo => {
    const data = new FormData();
    data.append('whatsapp_no', "");
;
console.log(LoginState.Token)

console.log('https://api.aroundme.co.in/businessapp/BusinessOwner/edit/' + LoginState.Mid + '/')
    const config = {
      method: 'put',
      url: 'https://api.aroundme.co.in/businessapp/BusinessOwner/edit/' + LoginState.Mid + '/',
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${LoginState.Token}`  // Replace with your actual token
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setModalVisible(true)
      // Alert.alert('Success', 'WhatsApp number updated successfully');
    } catch (error) {
      console.log(error);
      // Alert.alert('Error', error);
    }
  };

  const[modalVisible,setModalVisible]=useState(false)
  return (
    <>

      <View style={styles.otpContainer}>

        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, isError ? styles.errorBorder : null]}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChangeText(text, index)}
            value={digit}
          />
        ))}
      </View>
      <View style={{borderWidth:0,justifyContent:"flex-end",alignSelf:"flex-end"}}>

      <TouchableOpacity style={styles.button} onPress={handleConfirmOtp}>
        <Text style={styles.buttonText}>Confirm OTP </Text>
      </TouchableOpacity>
      </View>
      {modalVisible&& <AlertMessage screenName={"UserProfile"} Title={"WhatsApp number updated successfully"} modalVisible={modalVisible} setModalVisible={setModalVisible}></AlertMessage>}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#961702',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default OTPInput;
