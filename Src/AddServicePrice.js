import React,{useEffect, useState} from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Header } from './Header'
import AlertMessage from './AlertMessage'
import axios from 'axios'
import BusinessDetails from './Business/Businessdetails'


const AddServicePrice = () => {


























  const [serviceName,setServiceName]=useState('')
    const[Marsketprice,setMarketPrice]=useState('')
    const[PaymentMode,setPayementMode]=useState('')
    const[Discount,setDiscount]=useState('');
    const[Details,setDetails]=useState('')
    const[Duration,setDuration]=useState('')
    const[price,setPrice]=useState('')





    const[serviceNameError,setServiceNameError]=useState(false);
    const[MarsketpriceError,setMarketPriceError]=useState(false)
    const[PaymentModeError,setPaymentModeError]=useState(false)
    const[DiscountError,setDiscountError]=useState(false)
    const[DetailsError,setDetailsError]=useState(false)
    // const[DurationError,setDurationError]=useState(false)
    const[priceError,setPriceError]=useState(false)
    

  const Style=StyleSheet.create({
    Title:{color:'black',
  fontSize:15
  },


  inputText:{
    borderWidth:2,borderRadius:50,paddingHorizontal:30,borderColor:'#B3B3B3'
  }

  ,
  inputTextError:{
    borderWidth:2,borderRadius:50,paddingHorizontal:30,borderColor:'#961702'
  },
  })











  const onsumit=()=>{

    console.log(serviceName.length)

    if(serviceName.length>2){
      setServiceNameError(false)
      }else{
      setServiceNameError(true)
      }


    if(Marsketprice.length>0){
      setMarketPriceError(false)
     }else{
      setMarketPriceError(true)
    }


    if(PaymentMode.length>2){
      setPaymentModeError(false)
     }else{
      setPaymentModeError(true)
    }


 


    if(Discount.length>0){
      setDiscountError(false)
     }else{
      setDiscountError(true)
    }


    if(Details=="0"&&Details==""){
      setDetailsError(true)
     }else{
      setDetailsError(false)
      
    }

    
    if(price.length>=1){
      setPriceError(false)
     }else{
      setPriceError(true)
    }







    

    if(priceError==false&&DetailsError==false&&DiscountError==false&&PaymentModeError==false&&serviceNameError==false&&MarsketpriceError==false){
  console.log("okkk")
  onsumbitServer();
}
    
  }




const[modalVisible,setModalVisible]=useState(false);

const success=()=>{
  setModalVisible(true)
}





























const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/Serviceprice/add/';

// Replace 'YOUR_BEARER_TOKEN' with your actual bearer token.

const headers = {
      // 'Authorization': 'Bearer '+Token+'',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3ODY0MDg1LCJpYXQiOjE2OTc3Nzc2ODUsImp0aSI6ImVjYjdmODdiNjc0NjQ0MmM5Y2Q2MWQ0YzFkMDk1MTgwIiwidXNlcl9pZCI6MX0.s5yIHhcti668KwYMUzHnoiLt1O55gwcCd4Wgd0SWmtQ',
};




const postData = {
    "Business_Details":98,
    "service":95,
    "mode_offer":PaymentMode,
    "price":price,
    "discount_optional":Discount,
    "market_price":Marsketprice,
    "duration_time":Duration}  
  
    const onsumbitServer=async()=>{



      axios.post(API_ENDPOINT, postData, { headers: headers })
      .then((response) => {
        // Handle the API response here.
      
        setModalVisible(true)

        console.log('API Response:', response.data);
      
        
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
    
    
    
    }
  


















useEffect(() => {
 
  busniessData();

}, [])



    const [dataList, setdataLiest] = useState([])
    const [BusSelectedValue, setBusSelectedValue] = useState('');
    const BushandleValueChange = (value) => {
      value==="0"?setDetailsError(true):setDetailsError(false)
      setBusSelectedValue(value);
     
  
      
    }
    const busniessData = () => {
      const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/';
      // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token.
      const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3ODY0MDg1LCJpYXQiOjE2OTc3Nzc2ODUsImp0aSI6ImVjYjdmODdiNjc0NjQ0MmM5Y2Q2MWQ0YzFkMDk1MTgwIiwidXNlcl9pZCI6MX0.s5yIHhcti668KwYMUzHnoiLt1O55gwcCd4Wgd0SWmtQ';
      // Define the Axios configuration with headers.
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };
  
      // Make a GET request using Axios.
      axios
        .get(API_ENDPOINT, axiosConfig)
        .then((response) => {
          // Handle the successful response here.
          setdataLiest(response.data.data)
          console.log('Response data:', response.data.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request.
          console.error('Request error:', error);
        });
    }
  
  







 return (
    <>
    <Header Title={'Add Service Price'}></Header>
   
    <ScrollView style={{padding:10,backgroundColor:'white'}}>
        <View style={{margin:10}}>
            <Text style={Style.Title}>Service Name</Text>
            <TextInput onChange={text=>   setServiceNameError(false)} onChangeText={text=>setServiceName(text)} placeholder='Service Name' style={serviceNameError==false? Style.inputText:Style.inputTextError}></TextInput>

        </View>




        <View style={{margin:10}}>
             <Text style={Style.Title}>Market Price</Text>
            <TextInput inputMode='numeric' onChange={text=>   setMarketPriceError(false)} onChangeText={text=>setMarketPrice(text)} placeholder='Enter Market Price' style={MarsketpriceError==false ?Style.inputText:Style.inputTextError}></TextInput>
        </View>


        <View style={{margin:10}}>
             <Text style={Style.Title}>Payment Mode Type</Text>
             <TextInput onChange={text=>   setPaymentModeError(false)} onChangeText={text=>setPayementMode(text)} placeholder='Enter Mode' style={PaymentModeError==false ?Style.inputText:Style.inputTextError}></TextInput>
        </View>





        <View style={{margin:10}}>
             <Text style={Style.Title}>Discount</Text>
     
             <TextInput inputMode='numeric' onChange={text=>   setDiscountError(false)} onChangeText={text=>setDiscount(text)} placeholder='Enter discount' style={DiscountError==false ?Style.inputText:Style.inputTextError}></TextInput>
     
         </View>




        {/* <View style={{margin:10}}>
             <Text style={Style.Title}>Business Details</Text>
             <TextInput onChange={text=>   setDetailsError(false)} onChangeText={text=>setDetails(text)} placeholder='Enter Business Details' style={DetailsError==false ?Style.inputText:Style.inputTextError}></TextInput>
        </View> */}


<View style={{margin:10}}>
             <Text style={Style.Title}>Business Details</Text>
        <View style={DetailsError == false ? Style.inputText : Style.inputTextError}>
            <BusinessDetails

              options={dataList}
              selectedValue={BusSelectedValue}

              onValueChange={BushandleValueChange}
            />
          </View>
</View>



        <View style={{margin:10}}>
             <Text style={Style.Title}>Duration Time ( Optional )</Text>
             <TextInput onChangeText={text=>setDuration(text)} placeholder='Enter Business Details' style={Style.inputText}></TextInput>
        </View>




        <View style={{margin:10}}>
             <Text style={Style.Title}>Enter Price</Text>
             <TextInput inputMode='numeric' onChange={text=>   setPriceError(false)} onChangeText={text=>setPrice(text)} placeholder='Enter Business Details' style={priceError==false ?Style.inputText:Style.inputTextError}></TextInput>
        </View>



        <View style={{marginVertical:20,marginBottom:100}}>
            
            <TouchableOpacity onPress={()=>onsumit()} style={{backgroundColor:'#961702',alignSelf:'center',paddingVertical:10,paddingHorizontal:100,borderRadius:30}}>
          <Text style={{fontSize:20,color:'white'}}>Save Service Price</Text>
          </TouchableOpacity>
        </View>
        <AlertMessage Title={"Price add successfully"} modalVisible={modalVisible} setModalVisible={setModalVisible}></AlertMessage>
    </ScrollView>
    </>
  )
}

export default AddServicePrice