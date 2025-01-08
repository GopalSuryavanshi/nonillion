import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AlertMessage from './AlertMessage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CreateAccount = (props) => {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screenName, setScreenName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sms, setSms] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [OTPone, setOTPone] = useState('');
  const [OTPtwo, setOTPTwo] = useState('');
  const [OTPThree, setOTPThree] = useState('');
  const [OTPFour, setOTPFour] = useState('');
  const [OTPFive, setOTPFive] = useState('');
  const [OTPSix, setOTPSix] = useState('');
  const [OTPServer, setServer] = useState('');
  const [OTPstep, setOTPstep] = useState(1);
  const [fullnameError, setFullnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const OTP1Ref = useRef();
  const OTP2Ref = useRef();
  const OTP3Ref = useRef();
  const OTP4Ref = useRef();
  const OTP5Ref = useRef();
  const OTP6Ref = useRef();

  const handlePress = (e) => {
    if (phone.length === 10) {
      sendotpapi();
    } else {
      setPhoneError(true);
    }
  };

  const handlePasswordCheck = (e) => {
    if (password !== e) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const sendotpapi = async () => {
    try {
      const response = await fetch('https://api.aroundme.co.in/login/send_otp/' + phone);
      const result = await response.json();

      if (result.otp === undefined) {
        setSms("This mobile number already exists");
        setModalVisible(true);
      } else {
        setServer(result.otp);
        console.log(result.otp)
        setOTPstep(2);
        setPhoneError(false);
      }
    } catch (error) {
      setSms("This mobile number already exists");
      setModalVisible(true);
    }
  };

  const varfiyBtn = () => {
    if ((OTPone + OTPtwo + OTPThree + OTPFour + OTPFive + OTPSix) == OTPServer) {
      setOTPstep(3);
    } else {
      setModalVisible(true);
      setSms("Please Enter Valid OTP");
    }
  };

  const SubmitForm = () => {
    if (fullname.length > 3) {
      setFullnameError(false);

      if (OTPstep === 3) {
        setPhoneError(false);

        if (password.length > 5 && password === confirmPassword) {
          setConfirmPasswordError(false);
          handleSubmit();
        } else {
          setConfirmPasswordError(true);
        }
      } else {
        setPhoneError(true);
      }
    } else {
      setFullnameError(true);
    }
  };

  const handleOTPChange = (text, index) => {
    switch (index) {
      case 1:
        setOTPone(text);
        if (text.length === 1) OTP2Ref.current.focus();
        break;
      case 2:
        setOTPTwo(text);
        if (text.length === 1) OTP3Ref.current.focus();
        else if (text.length === 0) OTP1Ref.current.focus();
        break;
      case 3:
        setOTPThree(text);
        if (text.length === 1) OTP4Ref.current.focus();
        else if (text.length === 0) OTP2Ref.current.focus();
        break;
      case 4:
        setOTPFour(text);
        if (text.length === 1) OTP5Ref.current.focus();
        else if (text.length === 0) OTP3Ref.current.focus();
        break;
      case 5:
        setOTPFive(text);
        if (text.length === 1) OTP6Ref.current.focus();
        else if (text.length === 0) OTP4Ref.current.focus();
        break;
      case 6:
        setOTPSix(text);
        if (text.length === 0) OTP5Ref.current.focus();
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const postData = {
      "business_name": fullname,
      "username": phone,
      "password": password,
      "user_type": "BU"
    };

    try {
      const response = await axios.post('https://api.aroundme.co.in/login/register/', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response.data === "User already exists") {
        // Handle existing user case
      } else {
        setScreenName("Home");
        setSms("Account created successfully");
        setModalVisible(true);
      }
    } catch (error) {
      setLoading(false);
      setSms("An error occurred during registration");
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <FullScreenDataLoader color={"#961702"} />}

      <ScrollView style={styles.Container}>
        {modalVisible && <AlertMessage screenName={screenName} modalVisible={modalVisible} setModalVisible={setModalVisible} Title={sms} />}
        <View style={{ height: 40 }}></View>

        <Text style={styles.Headers2}>Register Your Business </Text>

        <TextInput
          placeholderTextColor={"#808080"}
          style={fullnameError == false ? styles.textInput : styles.textInputerror}
          placeholder="Business Name"
          onChangeText={(text) => { setFullname(text); text.length > 3 && setFullnameError(false) }}
          value={fullname}
        />

        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <TextInput
            placeholderTextColor={"#808080"}
            placeholder="Enter phone."
            keyboardType='numeric'
            onChangeText={(text) => { setPhone(text); setOTPstep(1) }}
            value={phone}
            style={phoneError == false ? styles.textInput : styles.textInputerror}
          />
          {OTPstep == 1 && (
            <TouchableOpacity style={{ right: 105, bottom: -11 }} onPress={handlePress}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          )}
          {OTPstep == 3 && (
            <View style={{ right: 100, bottom: -30 }}>
              <Icon style={{ fontSize: 20, left: 62, top: -18 }} name='verified' color={"green"} />
            </View>
          )}
        </View>

        {OTPstep === 2 && (
          <View style={{ marginTop: 30 }}>
            <View style={{ flex: 1, flexDirection: 'row', maxHeight: 45, justifyContent: 'space-evenly' }}>
              <TextInput
                ref={OTP1Ref}
                keyboardType="numeric"
                style={styles.OTP}
                value={OTPone}
                onChangeText={text => handleOTPChange(text, 1)}
                maxLength={1}
              />
              <TextInput
                ref={OTP2Ref}
                keyboardType="numeric"
                style={styles.OTP}
                value={OTPtwo}
                onChangeText={text => handleOTPChange(text, 2)}
                maxLength={1}
              />
              <TextInput
                ref={OTP3Ref}
                keyboardType="numeric"
                style={styles.OTP}
                value={OTPThree}
                onChangeText={text => handleOTPChange(text, 3)}
                maxLength={1}
              />
              <TextInput
                ref={OTP4Ref}
                keyboardType="numeric"
                style={styles.OTP}
                value={OTPFour}
                onChangeText={text => handleOTPChange(text, 4)}
                maxLength={1}
              />
              <TextInput
                ref={OTP5Ref}
                keyboardType="numeric"
                style={styles.OTP}
                value={OTPFive}
                onChangeText={text => handleOTPChange(text, 5)}
                maxLength={1}
              />
              <TextInput
                ref={OTP6Ref}
                keyboardType="numeric"
                style={styles.OTP}
                value={OTPSix}
                onChangeText={text => handleOTPChange(text, 6)}
                maxLength={1}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity onPress={sendotpapi}>
                <Text style={styles.btnSubmit}>Resend OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={varfiyBtn}>
                <Text style={styles.btnSubmit}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Password Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholderTextColor={"#808080"}
            style={confirmPasswordError == false ? styles.textInput : styles.textInputerror}
            placeholder="Create new password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity style={{right:35,top:10}} onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#808080" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholderTextColor={"#808080"}
            style={confirmPasswordError == false ? styles.textInput : styles.textInputerror}
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            onChangeText={(text) => { setConfirmPassword(text); text.length > 3 && handlePasswordCheck(text) }}
            value={confirmPassword}
          />
          <TouchableOpacity style={{right:35,top:10}}  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <FontAwesome name={confirmPasswordVisible ? "eye" : "eye-slash"} size={20} color="#808080" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={SubmitForm}>
          <Text style={styles.btnSubmit}>Confirm Registration</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: "#000" }}>Already a user?  </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <Text style={{ color: '#961702', fontWeight: '900' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    width: '98%',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    color: "#000",
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor:"#fff",
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  textInputerror: {
    borderColor: '#961702',
    borderWidth: 1,
    marginTop: 20,
    width: '98%',
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    color: "#000",
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  Container: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: 'white',
    alignContent: 'center',
    paddingTop:100
  },
  buttonText: {
    color: 'white',
    backgroundColor: '#961702',
    padding: 6,
    borderRadius: 5,
    height: 30,
    fontWeight: '800',
    paddingHorizontal: 15
  },
  OTP: {
    backgroundColor: '#9617024D',
    borderRadius: 5,
    height: 50,
    width: 50,
    textAlign: 'center',
    fontWeight: "900",
    fontSize: 22,
  },
  btnSubmit: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    padding: 8,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "900",
    backgroundColor: '#961702',
    color: 'white',
    paddingHorizontal: 30
  },
  Headers2: {
    fontSize: 18,
    color: '#850101',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    textAlign: "center",
  },
});

export default CreateAccount;
