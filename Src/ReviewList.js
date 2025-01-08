import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {View,Image,Text} from 'react-native'

const UserICon = './assets/UserIcon.png';

const reviwestar = './assets/Reviewstar.png';


const ReviewList = () => {
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];



useEffect(() => {
  getApiData();
}, [])


const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const [dataX,setdataX]=useState([])


    const getApiData = async () => {
      try {
        const response = await axios.get('https://api.aroundme.co.in/businessapp/feedback/view?business_id=517', {
          headers: {
            // Replace 'YOUR_BEARER_TOKEN' with your actual Bearer Token
            Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3Mjc1ODQwLCJpYXQiOjE3MDcxODk0NDAsImp0aSI6IjYxNmNlM2U2NDY5NzRiNDY4MTQzNmRkMmRjMWQ5YWJiIiwidXNlcl9pZCI6ODgzfQ.fgCQd_9nisFOx6WZDjqpyThsN7Obb-Sjtrrc49Qg_ho'
          }
        });
        setdataX(response.data.data);
        console.error('There was an error!', response.data.data);

      } catch (error) {
        console.error('There was an error!', error);
      }
    };    

  return (
<>

{dataX&& dataX.map((item, index) => (
<View>
    <View style={{flexDirection:'row' ,justifyContent:'space-between', margin:20}}>


    <View style={{}}>

    <Image source={require(UserICon)}></Image>

    </View>

    
    <View style={{alignSelf:'flex-end',justifyContent:'center'}}>

   <Image source={require(reviwestar)}></Image>
     </View>

    
    <View style={{alignSelf:'flex-end'}}>

    <Text>July 10, 2023, 9:24 a.m.</Text>
    </View>

    </View>
    <Text style={{Color:'black'}}>Amazing services by the staff. Very warm welcome given. The quality of oils and the massages is just excellent and feels so refreshing. Do not miss the herbal tea post the massage. Great ambience too</Text>

</View>
))}
</>
  )
}

export default ReviewList