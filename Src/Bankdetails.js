import React,{useState,useEffect} from 'react'
import { View, Text, TouchableOpacity,TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useMyContext } from './MyContext';
const Pensile='./assets/Pensile.png'



const Bankdetails = () => {


const [Edit,setEdit]=useState(false)
const [BankName,SetBnakName]=useState("");
const [AccountNumber,SetAccountNumber]=useState("");
const [IfscCode,setIfscCode]=useState("");



const [IfscCodeE,setIfscCodeE]=useState(false);
const [BankNameE,SetBnakNameE]=useState(false);
const [AccountNumberE,SetAccountNumberE]=useState(false);




const { LoginState, updateState } = useMyContext();
const AccessToken=LoginState;

const [Token,setToken]=useState(AccessToken.Token);

useEffect(() => {

  LoadBankData();
}, [])




const [bankData,setBankData]=useState([])



const LoadBankData=()=>{
  const apiUrl = 'https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id='+AccessToken.id; // Replace with your API endpoint





console.log(apiUrl)  
  // Make the GET request using Axios
  axios.get(apiUrl)
    .then(response => {
      // Handle the successful response here
      setBankData(response.data.data);
      console.log(response.data.data.Bank_Account_No);
      SetBnakName(response.data.data.Bank_Name)
      SetAccountNumber(JSON.stringify( response.data.data.Bank_Account_No))
      setIfscCode(response.data.data.Bank_Ifsc_Code)
      
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error fetching data:', error);
    });
}




const OnSubmitBank=()=>{
  if(BankName.length>2){
    SetBnakNameE(false)
    if(AccountNumber.length>2){
      SetAccountNumberE(false)
        if(IfscCode.length>2){
        setIfscCodeE(false)
            updateData();
       // LoadBankData();
       }else{
        setIfscCodeE(true)
      } 
   }else{
      SetAccountNumberE(true)
    }


  }else{
    SetBnakNameE(true)
  }
}



const newData={
  
  "Bank_Account_No":AccountNumber,
  "Bank_Name":BankName ,
  "Bank_Ifsc_Code":IfscCode
}

const updateData = async () => {
  try {
    const response = await axios.put('https://api.aroundme.co.in/businessapp/BusinessOwner/edit/3/', newData,{headers});
     // Handle the response, e.g., show a success message or update your state.
    console.log('Data updated successfully:', response.data);
    Alert.alert("save successfully")
    // You can also trigger a re-fetch or update your state with the updated data.
  } catch (error) {
    // Handle errors, e.g., show an error message.
    console.error('Error updating data:', error);
  }
};



const tokenX = Token;
const headers = {
  Authorization: `Bearer ${tokenX}`,
  'Content-Type': 'application/json', // Adjust content type as needed
};

  return (
    <View>
      

      <View style={ Edit==true ?{backgroundColor:'#F7F7F7'
    ,marginVertical:50,marginHorizontal:10,padding:10,display:'none'}:{backgroundColor:'#F7F7F7'
    ,marginVertical:50,marginHorizontal:10,padding:10}}>

    <TouchableOpacity onPress={()=>{setEdit(true)}}>
       <Image style={{alignSelf:'flex-end'}} source={require(Pensile)}></Image>
       </TouchableOpacity>
      <Text style={{ color:'#961702', fontWeight:600,paddingVertical:20}}>Bank Name- </Text>
      <Text> {bankData.Bank_Name}</Text>

      <Text style={{ color:'#961702', fontWeight:600,paddingVertical:20}}>Account Number- </Text>
      <Text> {bankData.Bank_Account_No}</Text>
      <Text style={{ color:'#961702', fontWeight:600,paddingVertical:20}}>IFSC Code- </Text>
      <Text> {bankData.Bank_Ifsc_Code}</Text>
     
      </View>









      <View style={Edit!=true ?{flex:1,display:'none'}:{flex:1,paddingVertical:40,marginTop:10}} > 
    <View style={{padding:5}}>
      <Text style={{fontSize:18,color:'#961702',fontWeight:'700'}}>Bank Name</Text>
      <View style={BankNameE==false? {borderWidth:2,borderColor:'#E6E6E6',borderRadius:100,marginVertical:5}:{borderWidth:2,borderColor:'#961702',borderRadius:100,marginVertical:5}}>
    
      <TextInput value={BankName}  onChangeText={Text=>SetBnakName(Text)} placeholder='Enter Bank Name' style={{marginHorizontal:25,}} ></TextInput>
      
      </View>
    </View>



    <View style={{padding:5}}>
      <Text style={{fontSize:18,color:'#961702',fontWeight:'700'}}>Account Number </Text>
      <View style={AccountNumberE==false? {borderWidth:2,borderColor:'#E6E6E6',borderRadius:100,marginVertical:5}:{borderWidth:2,borderColor:'#961702',borderRadius:100,marginVertical:5}}>
    
      <TextInput value={AccountNumber} onChangeText={Text=>SetAccountNumber(Text)} placeholder='Enter Account Number ' style={{marginHorizontal:25,}} ></TextInput>
      
      </View>
    </View>




    <View style={{padding:5}}>
      <Text style={{fontSize:18,color:'#961702',fontWeight:'700'}}>IFSC Code</Text>
      <View style={IfscCodeE==true? {borderWidth:2,borderColor:'#961702',borderRadius:100,marginVertical:5}:{borderWidth:2,borderColor:'#E6E6E6',borderRadius:100,marginVertical:5}}>
    
      <TextInput value={IfscCode} onChangeText={Text=>setIfscCode(Text)} placeholder='Enter IFSC Code' style={{marginHorizontal:25,}} ></TextInput>
      
      </View>
    </View>
    
    <View style={{padding:5,marginBottom:100,justifyContent:'center' ,alignSelf:'center'}}>
      <TouchableOpacity onPress={()=>OnSubmitBank()} style={{backgroundColor:'#961702',borderRadius:40,justifyContent:'center',width:200,height:40}}>
      <Text style={{fontSize:18,color:'white',fontWeight:'700',alignSelf:'center'}}>Save</Text>
      </TouchableOpacity>
    </View>
    
    
    </View>
       



       
       
    </View>
  )
}

export default Bankdetails