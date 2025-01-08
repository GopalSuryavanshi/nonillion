import React, { useState,useEffect } from 'react'
import { Image, Text, View,ScrollView } from 'react-native'
import { Footer } from './Footer'

import TitleHeader from './TitleHeader'
import SlideBtn from './SlideBtn'
import NotificationList from './NotificationList'
import { useMyContext } from './MyContext'
import axios from 'axios'

const Notification = (props) => {
  const names = ["Alice", "Bob", "Charlie", "David","Alice", "Bob", "Charlie", "David","Bob", "Charlie", "David","Alice", "Bob", "Charlie", "David"];
 
 const[tab,settab]=useState(true)






 const { LoginState, updateState } = useMyContext();



const [Token,setToken]=useState(LoginState);






// const intervalId = setInterval(() => {

//   DataTable(Token);
//  }, 3000); 
useEffect(() => {


  DataTable();


return () => {
 // Clear the interval when the component unmounts
 
};
}, [])



 const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/notificationview/?offset=0&page_size=30&user_id=test,contains,string';
   // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token.
        // Define the request configuration.
 const config = {
   method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
   url: API_ENDPOINT,
 
   //
   // Add any other relevant options like data, params, etc.
 };
 

 


 const [data,setdata]=useState([]);
 const DataTable= async()=>{
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
    <View style={{flex:1,backgroundColor:'white'}}>
       <TitleHeader Title={"Notification"}></TitleHeader>
<SlideBtn Title1={"List"} Title2={"Datails"} tab={tab} settab={settab}></SlideBtn>
<ScrollView>
{data.map((name, ) => (
<NotificationList data={name}></NotificationList>))}
</ScrollView>



       
    {/* <View style={{height:650,padding:10}}>
    <ScrollView>
    {names.map((name, index) => ( <View style={{borderWidth:1,height:40,borderRadius:15,flexDirection:'row',justifyContent:'space-between',padding:10,marginVertical:5}}>
          <Text>{index}</Text>
          <Text>Service name</Text>
          <Text> p  d</Text>
        </View>))}
       
        </ScrollView>
       
       
    </View>

    <View style={{position:'absolute',backgroundColor:'#961702',width:60,height:60,bottom:100,right:10,borderRadius:100,justifyContent:'center'}}>
      <Image source={require('./assets/Iconpluse.png')} style={{alignSelf:'center'}}></Image>
    </View> */}
    <Footer props={props} title={"Notification"}></Footer>
    </View>
  )
}

export default Notification