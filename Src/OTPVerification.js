import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AlertMessage from './systm/AlertMessage';
import axios from 'axios';

export const OTPVerification = ({ route }) => {
  const [OneBox, setOneBox] = useState('');
  const [TwoBox, setTwoBox] = useState('');
  const [ThreeBox, setThreeBox] = useState('');
  const [FourBox, setFourBox] = useState('');
  const [FiveBox, setFiveBox] = useState('');
  const [SixBox, setSixBox] = useState('');

  const { data } = route.params;
  const [OTPdata, setdataOTP] = useState(data.data);
  const [UserName, setUsername] = useState(data.username);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  // Create refs for each TextInput
  const refOneBox = useRef();
  const refTwoBox = useRef();
  const refThreeBox = useRef();
  const refFourBox = useRef();
  const refFiveBox = useRef();
  const refSixBox = useRef();

  const VarifyOTP = () => {
    const enteredOTP = OneBox + TwoBox + ThreeBox + FourBox + FiveBox + SixBox;
    if (enteredOTP == OTPdata) {
      navigation.navigate('NewCredentials', { data: UserName });
    } else {
      setModalVisible(true);
    }
  };

  const jsonData = {
    phone: UserName,
  };

  const passwordreset = () => {
    axios.post('https://api.aroundme.co.in/login/client-reset-password/', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data.otp) {
        setUsername(response.data.otp);
        setdataOTP(response.data.otp);
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
    });
  };

  const handleBackspace = (setBox, refPrevBox) => {
    setBox('');
    if (refPrevBox) refPrevBox.current.focus();
  };

  const styles = StyleSheet.create({
    OTPbox: {
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#9617024D',
      width: 50,
      height: 50,
      borderRadius: 10,
      textAlign: 'center',
      fontWeight: "700",
      color: '#000',paddingTop:10,
      lineHeight:22

    },
    OTPboxError: {
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#961702',
      backgroundColor: '#9617024D',
      width: 50,
      height: 50,
      borderRadius: 10,
      textAlign: 'center',
      color: '#000',
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <AlertMessage modalVisible={modalVisible} setModalVisible={setModalVisible} Title={"Wrong OTP entered"} />
      <Text style={{ fontSize: 30, color: '#850101', fontWeight: '700', paddingVertical: 20, fontFamily: 'Poppins-Regular' }}>
        OTP Verification
      </Text>
      <Text style={{ fontSize: 20, textAlign: 'center', paddingVertical: 20 }}>
        Enter 6 digit one time password sent on your registered mobile number
      </Text>
      <View style={{ width: 350, justifyContent: 'space-evenly', flexDirection: 'row', paddingVertical: 20 }}>
        <TextInput
          ref={refOneBox}
          placeholderTextColor={"#ccc"}
          maxLength={1}
          keyboardType="numeric"
          value={OneBox}
          onChangeText={text => {
            setOneBox(text);
            if (text.length === 1) refTwoBox.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(setOneBox, null);
            }
          }}
          style={OneBox ? styles.OTPbox : styles.OTPboxError}
        />
        <TextInput
          ref={refTwoBox}
          placeholderTextColor={"#ccc"}
          maxLength={1}
          keyboardType="numeric"
          value={TwoBox}
          onChangeText={text => {
            setTwoBox(text);
            if (text.length === 1) refThreeBox.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(setTwoBox, refOneBox);
            }
          }}
          style={TwoBox ? styles.OTPbox : styles.OTPboxError}
        />
        <TextInput
          ref={refThreeBox}
          placeholderTextColor={"#ccc"}
          maxLength={1}
          keyboardType="numeric"
          value={ThreeBox}
          onChangeText={text => {
            setThreeBox(text);
            if (text.length === 1) refFourBox.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(setThreeBox, refTwoBox);
            }
          }}
          style={ThreeBox ? styles.OTPbox : styles.OTPboxError}
        />
        <TextInput
          ref={refFourBox}
          placeholderTextColor={"#ccc"}
          maxLength={1}
          keyboardType="numeric"
          value={FourBox}
          onChangeText={text => {
            setFourBox(text);
            if (text.length === 1) refFiveBox.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(setFourBox, refThreeBox);
            }
          }}
          style={FourBox ? styles.OTPbox : styles.OTPboxError}
        />
        <TextInput
          ref={refFiveBox}
          placeholderTextColor={"#ccc"}
          maxLength={1}
          keyboardType="numeric"
          value={FiveBox}
          onChangeText={text => {
            setFiveBox(text);
            if (text.length === 1) refSixBox.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(setFiveBox, refFourBox);
            }
          }}
          style={FiveBox ? styles.OTPbox : styles.OTPboxError}
        />
        <TextInput
          ref={refSixBox}
          placeholderTextColor={"#ccc"}
          maxLength={1}
          keyboardType="numeric"
          value={SixBox}
          onChangeText={text => {
            setSixBox(text);
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(setSixBox, refFiveBox);
            }
          }}
          style={SixBox ? styles.OTPbox : styles.OTPboxError}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
        <TouchableOpacity
          onPress={passwordreset}
          style={{ width: 120, padding: 7, borderRadius: 10, height: 42 }}
        >
          <Text style={{ fontWeight: "700", fontSize: 18, color: '#961702', alignSelf: 'center', fontFamily: 'Poppins-Regular' }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={VarifyOTP}
          style={{ backgroundColor: '#961702', width: 120, padding: 7, borderRadius: 10, height: 42 }}
        >
          <Text style={{ fontWeight: "700", fontSize: 18, color: 'white', alignSelf: 'center', fontFamily: 'Poppins-Regular' }}>
            Verify OTP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
