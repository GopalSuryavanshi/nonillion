import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomCheckbox from './CustomCheckbox';
import axios from 'axios';
import { useMyContext } from './MyContext';
import FullScreenDataLoader from './System/FullScreenDataLoader';
import { CommonActions } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
// import firestore from '@react-native-firebase/firestore';

const Home = (props) => {
  const { LoginState, updateState } = useMyContext();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameE, setUserNameE] = useState(false);
  const [passwordE, setPasswordE] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Loader, setLoader] = useState(false);

  
  const jsonData = {
    "username": username,
    "password": password
  };

  
 
  const[textTOken,settext]=useState("")
  async function getFCMToken() {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    settext(token)
    return token;
  }
  const handleLogin = async () => {
    setLoader(true);
    try {
      if (username.length !== 10) {
        setUserNameE(true);
      } else {
        setUserNameE(false);
        if (password.length >= 6) {
          setPasswordE(false);
          const response = await axios.post('https://api.aroundme.co.in/login/businesslogin/', jsonData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = {
            Token: response.data.access,
            id: response.data.id,
            Mid: response.data.Business_Owner.id,
            Busid: response.data.Business_Details.id,
            FCM:textTOken
          };
          console.log(data);
          updateState(data);
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard',params: { token: textTOken }, }],
            })
          );
        } else {
          setPasswordE(true);
        }
      }
    } catch (error) {
      console.log('Error making POST request:', error);
      
      if (error.response && error.response.status === 404) {
        const message = error.response.data.message;
      
        setErrorMessage(message);
      
    }
    if (error.response && error.response.status === 400) {
      const message = error.response.data.message;
    
      setErrorMessage(message);
    
  }
  
  
  
  }
    
    setLoader(false);
  };

  const selasPenal = async () => {
    setLoader(true);
    try {
      if (username.length !== 10) {
        setUserNameE(true);
      } else {
        setUserNameE(false);
        if (password.length >= 6) {
          setPasswordE(false);
          const response = await axios.post('https://api.aroundme.co.in/login/businesslogin/', jsonData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = {
            Token: response.data.access,
            id: response.data.id,
            Mid: response.data.Business_Owner.id,
            Busid: response.data.Business_Details.id,
          };
          console.log(data);
          updateState(data);
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'selasPenal' }],
            })
          );
        } else {
          setPasswordE(true);
        }
      }
    } catch (error) {
      console.log('Error making POST request:', error);
      setErrorMessage("Invalid credentials found!");
    }
    setLoader(false);
  };

  useEffect(() => {
    getFCMToken()
    if (LoginState.Token) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      );
    }
  }, [LoginState, props.navigation]);

  return (
    <View style={styles.container}>
      {Loader && <FullScreenDataLoader color={"#961702"} />}
      <Text style={styles.Headers2}>Login to your account  </Text>

      <TextInput

      placeholderTextColor={"#808080"} 
        value={username}
        onChangeText={newText => {
          setUserName(newText);
          setUserNameE(false);
          setErrorMessage("");
        }}
        style={usernameE ? styles.textInputError : styles.textInput}
        placeholder="Enter phone number"
        keyboardType='number-pad'
      />

      <View style={{width:"100%",justifyContent:"center",left:40}}>
      <TextInput
      
      placeholderTextColor={"#808080"} 
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordE(false);
          setErrorMessage("");
        }}
        style={passwordE ? styles.textInputError : styles.textInput}
        secureTextEntry={!showPassword}
        placeholder="Password"
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.showHideButton}
      >
        <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="grey" />
      </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <View style={styles.checkboxContainer}>
        <CustomCheckbox />
        <Text style={{color:'#000'}} onPress={() => props.navigation.navigate("Forgetpassword")}>
          Forgot Password?
        </Text>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account? 
        <Text onPress={() => props.navigation.navigate("CreateAccount")} style={styles.signupLink}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Headers2: {
    fontSize: 18,
    color: '#850101',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  textInput: {
    color: "#000",
    marginTop: 20,
    width: '80%',
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  textInputError: {
    borderColor: '#961702',
    borderWidth: 1,
    marginTop: 20,
    width: '80%',
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  showHideButton: {
    position: 'absolute',
    right: 100,
    bottom:12
   },
  errorMessage: {
    color: '#961702',
    marginTop: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#961702",
    borderRadius: 50,
    padding: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    paddingHorizontal: 40,
    fontWeight: '900',
    fontSize: 20,
    textAlign: "center",
  },
  signupText: {
    marginTop: 10,
    fontWeight: '300',
    color: '#850101',
  },
  signupLink: {
    fontWeight: '900',
    color: '#850101',
  },
});

export default Home;
