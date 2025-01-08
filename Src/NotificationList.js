import React from 'react'
import { Image, Text, View } from 'react-native'

const NotificationList = ({data}) => {



  const dateString = "2023-10-30T06:07:23.326435Z";

  // Create a Date object from the input string
  const date = new Date(dateString);
  
  // Get the components of the date (day, month, year)
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = date.getFullYear();

  const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
  
  // Create a function to format the date as "dd/MM/yyyy"
  function formatDateToDDMMYYYY(date) {
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedYear = String(year);



    
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }
  
  // Call the function to get the formatted date string
  
  
  


  const DataTime=(Datetime)=>{
    const timestamp = Datetime;

// Create a Date object from the timestamp
const date = new Date(timestamp);

// Extract date and time components
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Format components as a human-readable date and time string
return formattedDateTime = `${day }-${month}-${year} ${hours}:${minutes}:${seconds}`;

  }




  return (
   <View style={{flexDirection:'row',padding:10}}>
    <View style={{borderWidth:2,borderRadius:500,height:50,width:50,borderColor:'#961702',justifyContent:'center',alignSelf:'center'}} >
    <Image source={require('./assets/Balicon.png')} style={{alignSelf:'center',height:30,width:30,borderRadius:75}}></Image>
    </View>
    <View style={{paddingHorizontal:20,flexDirection:'column',justifyContent:'center',alignSelf:'center',width:300}}>
    <Text style={{fontWeight:900}}> {data.title}</Text>
    <Text style={{fontWeight:900}}> {data.description}</Text>
<Text>{ DataTime(data.datetime)}</Text>
</View>
   </View>
  )
}

export default NotificationList