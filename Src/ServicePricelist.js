import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import { } from 'react-native-elements';

const ServicePricelist = ({ getData,srNo,serviceName, subcategory_name,category_name,duration}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };






    //   const deleteData = async (id) => {
    //     try {
    //       // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    //       const apiUrl = 'https://api.aroundme.co.in/businessapp/Service/delete/';
    
    //       // Replace 'YOUR_BEARER_TOKEN' with your actual Bearer token
    //       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3Nzc2OTI4LCJpYXQiOjE2OTc2OTA1MjgsImp0aSI6ImJmNzJmNTk1NjYwMzQ1ZWI5ZjdhOWJjOTBiNzgwMzFkIiwidXNlcl9pZCI6MX0.D-jqwYrjDE0JvsODmY-O09jxQh4B8fJ3gwrUxBBLQl8';
    
    //       // Data to send in the request body
    //       const data = {
            
    //         ids: [id],
    //         // Add other data as needed
    //       };
    
    //       // Send the DELETE request with the Bearer token and JSON data
    //       const response = await axios.delete(apiUrl, {
    //         data, // Send JSON data in the request body
    //         headers: {
    //           'Authorization': `Bearer ${token}`, // Add the Bearer token in the headers
    //           'Content-Type': 'application/json', // Specify JSON content type
    //         },
    //       });
    
    //       console.log('Response:', response.data);
    //       getData();
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };
    

  return (
    <>
      <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'space-between' }}>


        <Text style={{fontWeight:800,color:'#961702'}}>{1}</Text>
        <Text style={{fontWeight:800,color:'#961702'}}>Durga salon classes and spa</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, width: 50 ,marginTop:3}}>
         
        <TouchableOpacity onPress={()=>deleteData(srNo)}>
          <Image source={require('./assets/WhitePensile.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleAccordion}>

            <Image style={{marginTop:2}} source={require('./assets/Downarrow.png')}></Image>
          </TouchableOpacity>
        </View>

      </View>


      {isExpanded && (
        <View style={{ backgroundColor: 'white', borderWidth: 0, padding: 5, borderRadius: 20, borderColor:'#CCCCCC' }}>
          <View style={{ flexDirection:  "row",borderColor:'#CCCCCC', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Text style={{fontWeight:800,color:'#CCCCCC',padding:10,width:130}}>Sr. No</Text>
            <Text style={{fontWeight:800,color:'#000000',padding:10}}>{srNo}</Text>
          </View>



          <View style={{ flexDirection: "row", borderTopWidth: 1,borderWidth:1,borderColor:'#CCCCCC'}}>
            <Text style={{fontWeight:800,color:'#CCCCCC',padding:10,width:130}}>Category name</Text>
            <Text style={{fontWeight:800,color:'#000000',padding:10}}>{category_name}</Text> 
          </View>




          <View style={{ flexDirection: "row", borderTopWidth: 0,borderWidth:1,borderColor:'#CCCCCC' }}>
            <Text style={{fontWeight:800,color:'#CCCCCC',padding:10,width:130}}>Sub category</Text>
            <Text style={{fontWeight:800,color:'#000000',padding:10}}>{subcategory_name}</Text>
          </View>


          <View style={{ flexDirection: "row", borderTopWidth: 0,borderWidth:1,borderColor:'#CCCCCC' }}>
            <Text style={{fontWeight:800,color:'#CCCCCC',padding:10,width:130}}>Duration Time</Text>
            <Text style={{fontWeight:800,color:'#000000',padding:10}}>{duration}</Text>
          </View>


          <View style={{ flexDirection: "row",borderWidth:1,borderTopWidth: 0 , borderBottomLeftRadius: 10,borderColor:'#CCCCCC', borderBottomRightRadius: 10 }}>
            <Text style={{fontWeight:800,color:'#CCCCCC',padding:10}}>Action</Text>
            <Text></Text>
          </View>


          

        </View>
      )}

    </>
  );
};

export default ServicePricelist;
