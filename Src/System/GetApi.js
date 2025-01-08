import React,{useState,useEffect} from 'react'
import { View ,Text,TouchableOpacity,Image,ScrollView,ToastAndroid} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GetApi = () => {


    const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/Businessfaqview/';
    const [Token,setToken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3Nzc2OTI4LCJpYXQiOjE2OTc2OTA1MjgsImp0aSI6ImJmNzJmNTk1NjYwMzQ1ZWI5ZjdhOWJjOTBiNzgwMzFkIiwidXNlcl9pZCI6MX0.D-jqwYrjDE0JvsODmY-O09jxQh4B8fJ3gwrUxBBLQl8");
    const getData=async()=>{
    const name=  await AsyncStorage.getItem("Token")
      setToken(name)
       DataTable(name);
    }
    
    useEffect(() => {
      getData();
         }, [])
    
    
        const headers = {
          // 'Authorization': 'Bearer '+Token+'',
          'Authorization': 'Bearer '+Token,
         };
        
        
        
        
        
        
         // Define the request configuration.
        const config = {
          method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
          url: API_ENDPOINT,
          headers: headers,
          // Add any other relevant options like data, params, etc.
        };
        
    
        
    
    
        const [data,setdata]=useState([]);
        const DataTable= async(TokenSuper)=>{
          
          console.log(config)
            axios(config)
      .then((response) => {
        // Handle the API response here.
        console.log('API Response:', response.data.data);
        setdata(response.data.data)
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
        }
    
    
  

  return (
   <View>
    
   </View>
  )
}

export default GetApi