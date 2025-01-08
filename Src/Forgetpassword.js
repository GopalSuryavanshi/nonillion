import React,{useState} from 'react'


import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

import axios from 'axios';
import AlertMessage from './AlertMessage';

const Forgetpassword = (props) => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
    },
  
    Headers: {
     fontSize:22,
     color:'#961702',
     fontWeight:'700'
     ,borderColor:'#fff',
     borderStyle:"dashed",
     fontFamily:'Poppins-Regular'
    },Headers2: {
        alignContent:'center',
      fontSize:16,
      color:'black',
      fontWeight:'200',
      paddingHorizontal:20,textAlign:'center',
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
    },
  
    HZaline:{
      flexDirection: 'row', // Horizontal layout
      justifyContent: 'space-between', // Space between child components
      paddingHorizontal: 10,
      fontFamily:'Poppins-Regular'
    }
  
  });
  


  const[Phone,setPhone]=useState("")

  
  const[ErrorPhone,setErrorPhone]=useState(false)

  const SendOTP=()=>{

//OTPVerification
       
    
if (Phone.length==10){
  setErrorPhone(false)
  passowrdreset();
  
  }else{

    setErrorPhone(true)
  }

}






const jsonData = {
  "phone":Phone,
  }
const passowrdreset=()=>{
  axios.post('https://api.aroundme.co.in/login/client-reset-password/', jsonData, {
    headers: {
      'Content-Type': 'application/json', 
      
      // Set the content type to JSON
      // You can also add other headers here if needed
    
    },
  })
    .then((response) => {
      // Handle the successful response here
      if(response.data.otp === undefined){
        setModalVisible(true)
       // alert("User Not Registered!");
       // setusernameerror(true);
      }else{
      
        console.log(response.data.otp)

        props.navigation.navigate("OTPVerification",{data:{data: response.data.otp,username:Phone}} )
      
        //console.log("otp: " + response.data.otp);
      }
      
    })

    .catch((error) => {
      // Handle any errors that occurred during the request
      setModalVisible(true)
    console.log('Error making POST request:', error);
    setusernameerror(true);
      });
   }

const[loader,setloader]=useState(false)

const[modalVisible,setModalVisible]=useState(false)
  return (
    <>
    <View style={styles.container}>

      <Text style={styles.Headers}>Forget Password</Text>
      <Text style={{ alignContent:'center',
      paddingVertical:20,
      color:'black',
      fontWeight:'500',
      paddingHorizontal:20,textAlign:'center', fontFamily:'Poppins-Regular'}}>Provide your account’s mobile number for which you write to reset your password</Text>

      <TextInput
      placeholderTextColor={"#ccc"}
      
        style={ErrorPhone==false?styles.textInput: styles.textInputError }

        {...Platform.select({

          android: {

            elevation: 5, // Adjust the elevation for shadow
          },
        })}
   tex
   value={Phone}
   keyboardType='numeric' placeholder="Enter phone number" onChangeText={(e)=>{setPhone(e); e.length==10? setErrorPhone(false): setErrorPhone(true)}} ></TextInput>




      <View style={{ padding: 50 }}>

       <TouchableOpacity style={{
         backgroundColor:'#961702',width:150,padding:7,borderRadius:10,height:42
        
      }}

      onPress={text=>SendOTP(text)}
     
     > 
      
      <Text   style={{fontWeight:"700", fontSize:18,color:'white',alignSelf:'center',padding:0,fontFamily:'Poppins-Regular'}}>Send OTP</Text>
      </TouchableOpacity>
      {/* <Btn bgColor={'#850101'}  props={props} screenName='OTPVerification' textColor='white' btnLabel="Send OTP" /> */}
      
     
      </View>



         


    

      

    </View>
   {modalVisible &&<AlertMessage setModalVisible={setModalVisible} modalVisible={modalVisible} Title={"This record does not match our database."}></AlertMessage>
}
    </>
  )

}

export default Forgetpassword