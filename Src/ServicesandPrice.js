import React, { useState,useEffect } from 'react'
import { Image, Text, View ,ScrollView, TouchableOpacity} from 'react-native'
import { Footer } from './Footer'
import { Header } from './Header'
import SlideBtn from './SlideBtn'
import Accordion from './Accordion'

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ServicePricelist from './ServicePricelist'
import { useMyContext } from './MyContext'


const ServicesandPrice = (props) => {

  
  const { LoginState, updateState } = useMyContext();
  const AccessToken=LoginState ;

  


  const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/ServiceView/';
  const [Token,setToken]=useState(LoginState.Token);
  const getData=async()=>{
  const name=  await AsyncStorage.getItem("Token")

  console.log(name)
    setToken(name)
     DataTable(name);
     DataTablePrice(name);
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
      
  
      const configPrice = {
        method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
        url: 'https://api.aroundme.co.in/businessapp/Servicepriceview/',
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


      const[dataPrice,setdataPrice]=useState([])
      const DataTablePrice= async(TokenSuper)=>{
        
        console.log(configPrice)
          axios(configPrice)
            .then((response) => {
              // Handle the API response here.
              console.log('API Response:', response.data.data);
              setdataPrice(response.data.data)
            })
            .catch((error) => {
              // Handle errors here.
              console.error('API Error:', error);
            });
      }














































    

  const [tab,settab]=useState(true);
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <Header Title={"Services & Prices"}></Header>

      <View style={{height:20}}></View>
      
      {tab==false?<SlideBtn Title1={"Services"} Title2={"Prices"} tab={tab} settab={settab}></SlideBtn> :
      <SlideBtn tab={tab} settab={settab} Title1={"Services"} Title2={"Prices"}></SlideBtn>}

      {tab==true&& <View style={{height:650,padding:10}}>
    <ScrollView>
    {data.map((item, index) => ( <View style={{borderWidth:2 ,borderColor:'#CCCCCC',borderRadius:20,justifyContent:'space-between',padding:10,marginVertical:5}}>
        
          <Accordion item={item} props={()=>props.navigation.navigate("UpdateService",{ id: item.id,item:item})} getData={getData} duration={item.duration_time} subcategory_name={item.subcategory_name} category_name={item.category_name} srNo={item.id} serviceName={item.service_name}     ></Accordion>
        
        </View>))}
       
        </ScrollView>
       
       
    </View>}




    {tab==false&& <View style={{height:650,padding:10}}>
    <ScrollView>
    {dataPrice.map((name, index) => ( <View style={{borderWidth:1,borderRadius:15,justifyContent:'space-between',padding:10,marginVertical:5}}>
          
          <ServicePricelist data={name}></ServicePricelist>
        </View>))}
       
        </ScrollView>
       
       
    </View>}







{tab==true? <TouchableOpacity onPress={()=>props.navigation.navigate("AddServices",{DataTable: DataTable})}>
    <View style={{position:'absolute',backgroundColor:'#961702',width:60,height:60,bottom:100,right:10,borderRadius:100,justifyContent:'center'}}>
      <Image source={require('./assets/Iconpluse.png')} style={{alignSelf:'center'}}></Image>
    </View> 
</TouchableOpacity>
:
<TouchableOpacity onPress={()=>props.navigation.navigate("AddPrice")}>
    <View style={{position:'absolute',backgroundColor:'#961702',width:60,height:60,bottom:100,right:10,borderRadius:100,justifyContent:'center'}}>
      <Image source={require('./assets/Iconpluse.png')} style={{alignSelf:'center'}}></Image>
    </View> 
</TouchableOpacity>}




        <Footer props={props} title={"Service"}></Footer>
    </View>
  )
}

export default ServicesandPrice
   


