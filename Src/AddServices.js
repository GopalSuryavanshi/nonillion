import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Header } from './Header'
import Businesstypes from './Businesstypes'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Subcatogry from './Business/Subcatogry'
import City from './Business/City'
import Businessdetails from './Business/Businessdetails'
import Duration from './Business/Duration'
import AlertMessage from './AlertMessage'
import { useMyContext } from './MyContext'
const UploadimgImg = './assets/fileUpload.png'
import ImageCropPicker from 'react-native-image-crop-picker'
import { Picker } from '@react-native-picker/picker'
import MyForm from './service/MyForm'

const AddServices = () => {


  const { LoginState, updateState } = useMyContext();






  const [selectedImageLogo, setselectedImageLogo] = useState(null);

  const [selectedImageLogoName, setselectedImageLogoName] = useState(null);

  const selectImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        compressImageQuality: 0.8,
      });

      setselectedImageLogo(image);
       const fileName2 = image.path;

       const filePath = fileName2;

// Split the file path by '/' to get an array of path segments
const pathSegments = filePath.split('/');

// The file name should be the last element of the array
const fileName = pathSegments[pathSegments.length - 1];

setselectedImageLogoName(fileName);
     } catch (error) {
      setselectedImageLogo(null);
      console.error(error);
    }
  };



  const Style = StyleSheet.create({
    Title: {
      color: '#961702',
      fontSize: 18
    },


    inputText: {
      borderWidth: 1, borderRadius: 50, paddingHorizontal: 15, borderColor: '#B3B3B3',
    },
    inputTextError: {
      borderWidth: 1, borderRadius: 50, paddingHorizontal: 15, borderColor: '#961702'
    }
  })



  const [dataCategory, setDataCategory] = useState([]);
  const [CatID, setCatID] = useState("");


  const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/category/';
  const [Token, setToken] = useState(LoginState.Token);
  const getData = async () => {
    const name = await AsyncStorage.getItem("Token")
    setToken(name)
    DataTable(name);
    DataTableSubCat(name)
  }

  useEffect(() => {
    getData();
    busniessData();
    CityData();
    DurationData();
  }, [])


  const headers = {
    // 'Authorization': 'Bearer '+Token+'',
    'Authorization': 'Bearer ' + Token,
  };






  // Define the request configuration.
  const config = {
    method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
    url: API_ENDPOINT,
    headers: headers,
    // Add any other relevant options like data, params, etc.
  };


  const config2 = {
    method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
    url: 'https://api.aroundme.co.in/businessapp/SubCategoryView/',
    headers: headers,
    // Add any other relevant options like data, params, etc.
  };




  const DataTable = async (TokenSuper) => {

    console.log(config)
    axios(config)
      .then((response) => {
        // Handle the API response here.
        console.log('API Response:', response.data.data);
        setDataCategory(response.data.data)
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
  }




  const [DataSubCategory, setSubDataCategory] = useState([])


  const DataTableSubCat = async (TokenSuper) => {

    console.log(config)
    axios(config2)
      .then((response) => {
        // Handle the API response here.
        console.log('API Response:', response.data.data);
        setSubDataCategory(response.data.data)
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
  }


  const [SelectedValue, setSelectedValue] = useState('');

  const [SubSelectedValue, setSubSelectedValue] = useState('');



  const SubhandleValueChange = (value) => {

    setSubSelectedValue(value);
    setBusinessSubcategoryError(false)
  }

  const handleValueChange = (value) => {
    setBusinessTypeError(false)
    setSelectedValue(value);
  };

  const [name, setName] = useState('');

  const [description, setdescription] = useState('');





  const [BusinessError, setBusinessError] = useState(false);
  const [ServiceNameError, setServiceNameError] = useState(false);
  const [BusinessTypeError,setBusinessTypeError]=useState(false);
  const [BusinessSubcategoryError,setBusinessSubcategoryError]=useState(false);

  const [BusinessCity,setBusinessCity]=useState(false);


  



const [DetailsError,setDetailsError]=useState(false)




  const Onsubmit = () => {

   
    if (BusSelectedValue == "0" || BusSelectedValue == "") {
     
      setBusinessError(true)
    } else {

      
      setBusinessError(false)
    
    
    if(name.length>3){
      setServiceNameError(false)
     

      if(SelectedValue == "0" || SelectedValue == ""){
        setBusinessTypeError(true)
      }else{
        setBusinessTypeError(false)
      



        if(SubSelectedValue == "0" || SubSelectedValue == ""){
          setBusinessSubcategoryError(false)
        }else{
          
          console.log(SubSelectedValue+"dfdfdfdfdfdfdfdfdddf")
          setBusinessSubcategoryError(false)
           
           sendData();
        }
        setModalVisible(true)
      }

     //setSubSelectedValue
    
    }else{
      setServiceNameError(true)
    }
    
    
    }



  


  

  }







  const sendData = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to send data to.
      const Url = 'https://api.aroundme.co.in/businessapp/Service/add/';


      // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token.
      // Create a form data object and append your form fields.

      const formData = new FormData();

      formData.append("business_details_id", "98");
      formData.append("service_name", name);
      formData.append("category_id", SelectedValue);
      formData.append("subcategory_id", "143");
      formData.append("image", "");
      formData.append("description", description);
      formData.append("city", "1");
      formData.append("valide_for", "10");
      formData.append("duration_time", "1");
      formData.append("status", "A");
      formData.append("meta_keyword", "sds");
      formData.append("meta_title", "dd");
      formData.append("meta_tags", "dd");
      formData.append("meta_description", "dd");


      // Make the Axios POST request with the form data and bearer token.
      const response = await axios.post(Url, formData, {
        headers,
      });

      // Handle the response as needed.
      console.log("okkkkkkkkkkkkkkk")
      console.log('Response:', response.data);
      setModalVisible(true)
    } catch (error) {
      // Handle any errors that occur during the request.
      console.error('Error:', error);
    }
  };

  // Call the function to send the data when needed.












































  const [dataList, setdataLiest] = useState([])
  const [BusSelectedValue, setBusSelectedValue] = useState('');
  const BushandleValueChange = (value) => {
    value==="0"?setBusinessError(true):setBusinessError(false)
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























  // city


  const [CityList, setCityLiest] = useState([])
  const [CitySelectedValue, setCitySelectedValue] = useState('');















  const [alertMs,setAlertMs]=useState(false)
  const[modalVisible,setModalVisible]=useState(false)
  
  
  
  
  
  
  
  const CityhandleValueChange = (value) => {
    setCitySelectedValue(value);
  }
  const CityData = () => {
    const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/location/';
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
        setCityLiest(response.data.data)
        console.log('Response data:', response.data.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request.
        console.error('Request error:', error);
      });
  }















  // city


  const [DurationList, setDurationList] = useState([])
  const [DurationSelectedValue, setDurationSelectedValue] = useState('');
  const DurationhandleValueChange = (value) => {
    setDurationSelectedValue(value);
  }
  const DurationData = () => {
    const API_ENDPOINTUrl = 'https://api.aroundme.co.in/businessapp/AdddurationView/';
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
      .get(API_ENDPOINTUrl, axiosConfig)
      .then((response) => {
        // Handle the successful response here.
        setDurationList(response.data.data)
        console.log('Response data:', response.data.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request.
        console.error('Request error:', error);
      });
  }
  return (
    <>
      <Header Title={"Add Services"}></Header>
      <ScrollView style={{ padding: 10, backgroundColor: 'white' }}>
        



        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Service Name</Text>

          
          <View style={ServiceNameError == false ? Style.inputText : Style.inputTextError}>
        
          <TextInput value={name} onChange={()=>setServiceNameError(false)} onChangeText={text => {setName(text);}} placeholder='Service Name' ></TextInput>
       </View>
        </View>


        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Business Name</Text>


          <View style={BusinessError == false ? Style.inputText : Style.inputTextError}>
            <Businessdetails

              options={dataList}
              selectedValue={BusSelectedValue}

              onValueChange={BushandleValueChange}
            ></Businessdetails>
          </View>






        </View>





        <View style={{ padding: 10 }}>
          <Text style={Style.Title}>Business Type</Text>






          <View>
          <View style={BusinessTypeError == false ? Style.inputText : Style.inputTextError}>
              <Businesstypes
                options={dataCategory}
                selectedValue={SelectedValue}
                CID={CatID}
                setCID={setCatID}
                onValueChange={handleValueChange}
              />

            </View>

          </View>
        </View>






        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Subcategory</Text>

          <View style={BusinessSubcategoryError == false ? Style.inputText : Style.inputTextError}>
            <Subcatogry
              options={DataSubCategory}
              selectedValue={SubSelectedValue}
              CID={CatID}
              setCID={setCatID}
              onValueChange={SubhandleValueChange}
            />
          </View>


        </View>





        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Business City</Text>

          <View style={Style.inputText}>
            <City
              options={CityList}
              selectedValue={CitySelectedValue}

              onValueChange={CityhandleValueChange}
            />
          </View>

        </View>






        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Service Duration ( Optional )</Text>
          <View style={ServiceNameError == false ? Style.inputText : Style.inputTextError}>
            <Duration
              options={DurationList}
              selectedValue={DurationSelectedValue}

              onValueChange={DurationhandleValueChange}
            />
          </View>

        </View>






        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Valid for (Optional)</Text>
          <TextInput placeholder='Enter Valid for (Optional)' style={Style.inputText}></TextInput>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Service Image ( Optional )</Text>
          <TextInput placeholder='Enter Valid for (Optional)' style={Style.inputText}></TextInput>
        </View>




        <View style={{ margin: 10 }}>
          <Text style={Style.Title}>Service Details</Text>
          <TextInput numberOfLines={4} multiline={true} placeholder='Start typing here....' style={{ borderColor:'#B3B3B3', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}></TextInput>
        </View>



        <View style={{ margin: 10 }}>
  <Text style={Style.Title}>Service duration (in minutes)</Text>
  <Picker
    
    style={{ height: 50, width: '100%', borderColor: '#B3B3B3', borderWidth: 1, borderRadius: 10 }}
    onValueChange={(itemValue, itemIndex) =>
      setSelectedService(itemValue)
    }>
    <Picker.Item label="Active" value="service1" />
    <Picker.Item label="In-active" value="service2" />
    
    {/* Add more Picker.Item components as needed */}
  </Picker>
</View>


        <View style={{ margin: 10 }}>
  <Text style={Style.Title}>Service Status</Text>
  <Picker
    
    style={{ height: 50, width: '100%', borderColor: '#B3B3B3', borderWidth: 1, borderRadius: 10 }}
    onValueChange={(itemValue, itemIndex) =>
      setSelectedService(itemValue)
    }>
    <Picker.Item label="Active" value="service1" />
    <Picker.Item label="In-active" value="service2" />
    
    {/* Add more Picker.Item components as needed */}
  </Picker>
</View>



        <View style={{padding:5}}>
      <Text style={{fontSize:18,color:'#961702',fontWeight:'700'}}>Service Image</Text>
      <View>

<TouchableOpacity onPress={selectImage}>
      <Image  style={{height:'auto',minHeight:200,width:360}}  source={selectedImageLogo==null?  require(UploadimgImg): {uri:selectedImageLogo.path}}></Image>
</TouchableOpacity>
<Text> 
 
</Text>
      {/* <Image height={100} source={{uri:selectedImageLogo.path}}></Image> */}
      


     
      </View>
    </View>




        <View style={{ marginVertical: 20, marginBottom: 100 }}>

          <TouchableOpacity style={{ backgroundColor: '#961702', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30 }} onPress={() => Onsubmit()}>
            <Text style={{ fontSize: 20, color: 'white' }}> Create Service</Text>
          </TouchableOpacity>
        </View>
        <AlertMessage modalVisible={modalVisible} setModalVisible={setModalVisible} status={alertMs} Title={'Create successfully '}></AlertMessage>
      </ScrollView>
      <MyForm></MyForm>
    </>
  )
}

export default AddServices