import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React,{useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Button, Alert } from 'react-native';

const NewCredentials = ({route}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
    },
  
    Headers: {
      
        fontSize: 30,
        color: '#850101',
        fontWeight: '700',
        paddingVertical: 20,
        fontFamily:'Poppins-Regular'
     
    },
    
    Headers2: {
      textAlign:'center',
      fontSize:15,
      color:'black',
      fontWeight:'400',
      width:"80%",
      fontFamily:'Poppins-Regular'
     },
  
  
     textInput: {
      marginTop: 20,
      width: '80%',
      height: 50,
      paddingHorizontal: 30,
      borderRadius: 10,
      backgroundColor: 'white',
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      color: '#000',
    },
    textInputError: {
      marginTop: 20,
      width: '80%',
      height: 50,
      paddingHorizontal: 30,
      borderRadius: 10,
      backgroundColor: 'white',
      borderColor: '#961702',
      borderWidth: 1,
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      color:"#000"
    },
  
    HZaline:{
      flexDirection: 'row', // Horizontal layout
      justifyContent: 'space-between', // Space between child components
      paddingHorizontal: 10,
    }
  
  });
  

  const {data} = route.params;
  const [username, setusername] = useState(data);
  const [password, setpassword] = useState("");
  const [passworderror, setpassworderror] = useState(false);

  const [confirmpass, setconfirmpass] = useState("");
  const [confirmpasserror, setconfirmpasserror] = useState(false);

  // update password
  const Jsondata = {
    
        "username":username,
        "password":password,
        "usertype":"EMP"
      }


const Updatepassword = () => {

  

  axios.patch('https://api.aroundme.co.in/login/client-newpassword/', Jsondata)
    .then(response => {
      console.log('Data updated successfully:', response.data);
      // Handle the successful response here

      navigation.navigate('ResponceSN')  

    })
    .catch(error => {
      console.error('Error updating data:', error);
      // Handle errors here
    });
};


const navigation = useNavigation();




const submit = () => {
  
  
  if (password.length >= 6) {

      if(password === confirmpass){
        // call api function here
        Updatepassword();
      }

      else{
        setconfirmpasserror(true);
       // alert("Password and confirm password doesn't match.")
      }

  } else {
    setpassworderror(true);
  }
};

  return (
    <View style={styles.container}>


<Text style={styles.Headers}>New Credentials</Text>


      <Text style={styles.Headers2}>
        Your identity has been verified..!
        Set your new password
      </Text>

      <TextInput
      
      placeholderTextColor={"#ccc"}
        style={passworderror? styles.textInputError:styles.textInput}


value={password}
onChangeText={text=>{setpassword(text), passworderror&& text.length>=6? setpassworderror(false):setpassworderror(true)}}

        {...Platform.select({

          android: {

            elevation: 5, // Adjust the elevation for shadow
          },
        })}

        secureTextEntry={true}
        placeholder="New Password" ></TextInput>

      <TextInput

placeholderTextColor={"#ccc"}
      
        style={confirmpasserror? styles.textInputError:styles.textInput}


value={confirmpass}
onChangeText={text=>{setconfirmpass(text), password==text? setconfirmpasserror(false): setconfirmpasserror(true)}}

        {...Platform.select({

          android: {

            elevation: 5, // Adjust the elevation for shadow
          },
        })}
        secureTextEntry={true}

        placeholder="Confirm Password" 
        
        
        ></TextInput>


      
      <View style={{ marginTop: 30 }}>





       <TouchableOpacity
        onPress={() => submit()}
        style={{
          backgroundColor:'#961702',width:150,padding:7,borderRadius:10,height:42
        }}>
        <Text  style={{fontWeight:"700", fontSize:18,color:'white',alignSelf:'center',padding:0,fontFamily:'Poppins-Regular'}}>
          Update
        </Text>
      </TouchableOpacity>
     
      </View>


    </View>
  )

}

export default NewCredentials