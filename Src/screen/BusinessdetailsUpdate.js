import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import '../MasterCss'
import { color } from 'react-native-elements/dist/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useMyContext } from '../MyContext';
import axios from 'axios';
import AlertMessage from '../AlertMessage';
import FullScreenDataLoader from '../System/FullScreenDataLoader';

import { Image } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import BusinessImage from '../Business/BusinessImage';

const Logo = '../assets/UserProfile.png';

const BusinessdetailsUpdate = () => {
  const { LoginState, updateState } = useMyContext();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [gst, setGst] = useState('');
  const [panNo, setPanNo] = useState('');
  const [highlightedArea, setHighlightedArea] = useState('');
  const [country, setCountry] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');


  const [LogoUrl, setLogoUrl] = useState('');
  const [DocfrontUrl, setDocfrontUrl] = useState('');
  const [DocBack, setDocBack] = useState('');





  const[modalVisible,setModalVisible]=useState(false)

  const [showBusinessTypes, setShowBusinessTypes] = useState(false);

  const handleSubmit = () => {
    // Handle form submission here
    // You can send the form data to your backend or perform any other action
  };

  const handleSelectBusinessType = (type) => {
    setBusinessType(type);
    setShowBusinessTypes(false); // Hide the list after selection
  };

  const options=[{category_name:"sdsd",id:1},{category_name:"sdsd",id:1},{category_name:"sdsd",id:1}]









useEffect(() => {

  businesstype();
  
}, [])


const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const[loader,setLoader]=useState(false);


  const[Img,setImg]=useState(null);
  const[ImgBack,setback]=useState(null);
  const[ImgFront,setfront]=useState(null);

  useEffect(() => {
    

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoader(true)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.aroundme.co.in/businessapp/?id='+LoginState.Busid,
      headers: { 
        'Authorization': 'Bearer '+LoginState.Token
      }
    };

    // console.error(config)

    try {
      const response = await axios.request(config);

      setBusinessName(response.data.data.business_name)
      setOpenTime(response.data.data.open_time)
      setCloseTime(response.data.data.close_time)
      setMapUrl(response.data.data.map_url)
      setPincode(response.data.data.pincode)
      setLatitude(response.data.data.latitude)
      setLongitude(response.data.data.longitude)
      setState(response.data.data.state)
      setCity(response.data.data.city_name)
      setImg(response.data.data.business_logo)
      setfront(response.data.data.business_documents_front_optional)
      setback(response.data.data.business_documents_back_optional)
      setHighlightedArea(response.data.data.highlighted_area)
      setCountry(response.data.data.country)
      setBusinessAddress(response.data.data.address)
      setGst(response.data.data.gst_optional)
setPanNo(response.data.data.pan_no)

setBusinessDescription(response.data.data.description)

      
setLoader(response.data=="no data")
      // Store the response data in state
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error); 
      
      setLoader(false)
      // Store the error in state
    }
  };
  // *********************business list data api***************************
const [businesslistdata, setBusinesslistdata]=useState([]);


const [selectBusType, setselectBusType]=useState("");
// business list data
 const businesstype = ()=>{
  
  axios.get('https://api.aroundme.co.in/businessapp/category/', {
    headers: {
      Authorization: `Bearer ${LoginState.Token}`
    }
   
  }).then(response => {
      setBusinesslistdata(response.data.data)
      // console.log(response.data.data)
  
    })

    .catch(error => {
      // Handle any errors here category_name
      console.error(error);
      console.log(LoginState.Token)
      // router.push('/account/signin')
    });

 }


 const fetchAddressAutocomplete = async (query) => {
  fetchPincodeDetails(query)
  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
      params: {
        text: query,
        apiKey: 'af0a971e7e7d458cbfa9dba8760929db'  // Replace 'YOUR_API_KEY' with your actual Geoapify API key
      }
    });
   
    
    setLatitude(JSON.stringify(response.data.features[0].properties.lat));
    setLongitude(JSON.stringify(response.data.features[0].properties.lon));
    setState(response.data.features[0].properties.state);
    
    // Process the response data as needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle errors if any
  }
};

const fetchPincodeDetails = async (pincode) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    setHighlightedArea(response.data[0].PostOffice[0].Name); 
    setCity(response.data[0].PostOffice[0].Division)
    setCountry(response.data[0].PostOffice[0].Country)
    
    
    
    // Process the response data as needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle errors if any
  }
};



const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };







  const dateObject = new Date("02/02/2023");


const dateString = dateObject;

// Parse the original date string to a Date object
// const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());

// Format the Date object to the ISO 8601 format

const [DateDob, setDateDob] = useState(new Date());





const updateData = async () => {
 
  const myHeaders = {
    'Authorization': `Bearer ${LoginState.Token}`
    
  };

  // FormData for PUT requests
  const businessformdata = new FormData();
  console.log(businessName)
  
  businessformdata.append("business_name", businessName);
  businessformdata.append('latitude', latitude);
  businessformdata.append('longitude', longitude);

  businessformdata.append('state', state);
  businessformdata.append('city_api', city);
  businessformdata.append('pincode', pincode);
  businessformdata.append('address', businessAddress);
  businessformdata.append('map_url', mapUrl);
  businessformdata.append('gst_optional', gst);
  businessformdata.append('pan_no', panNo);
  businessformdata.append('highlighted_area',highlightedArea);
  businessformdata.append('country', country);
  businessformdata.append('open_time', openTime);
  businessformdata.append('close_time', closeTime);
  businessformdata.append('description', businessDescription);

  const requestOptions = {
    method: 'put',
    url: 'https://api.aroundme.co.in/businessapp/edit/'+LoginState.Busid+'/',
    headers: myHeaders,
    data: businessformdata,
    redirect: 'follow'
  };

  try {
    const response = await axios(requestOptions);
    console.log(response.data);
    
    
    setModalVisible(()=>{fetchData() ;
      return true})   ;

    
    // Process the response data
  } catch (error) {
    console.error('Error:', error);

    
    // Handle errors here, for example, by setting error state in your component
  }
};







///image Upload


const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImageName, setSelectedImageName] = useState(null);

  const selectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        compressImageQuality: 0.8,
      });

      setSelectedImage(image);
       const fileName2 = image.path;

       const filePath = fileName2;

// Split the file path by '/' to get an array of path segments
const pathSegments = filePath.split('/');

// The file name should be the last element of the array
const fileName = pathSegments[pathSegments.length - 1];

setSelectedImageName(fileName);
    // Use the file name as needed
   
    registerUser(fileName,image);

    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (fileName,image) => {
    try {
      // Construct the form data for registration
      const formData = new FormData();
     
     
      


      // Append the image to the form data
      if (image) {
        formData.append('business_logo', {
          uri: image.path,
          type: image.mime,
          name: fileName,
        });
      }

  
      const headers =  {
        Authorization: `Bearer ${LoginState.Token}`
      }
      // Make an Axios POST request to your registration API endpoint
      const response = await axios.put('https://api.aroundme.co.in/businessapp/edit/557/', formData, { headers });

      // Handle the response from your server
      
      fetchData();
      console.log(response.status)
     
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <View style={{borderWidth:0}}>

      {loader&&<FullScreenDataLoader color={"#961702"}></FullScreenDataLoader>}

      <AlertMessage Title={"Business details update successfully"} modalVisible={modalVisible} setModalVisible={setModalVisible}></AlertMessage>
      <ScrollView style={{ padding: 0, backgroundColor: '#fff' }}>
        <Text style={styles.textHeading}>Business Name</Text>
        <TextInput
          value={businessName}
          onChangeText={setBusinessName}
          placeholder="Enter business name"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>Business Type</Text>

        
   
        
       
        <View   style={{padding:0,margin:0,borderWidth:1,borderRadius:100,height:50,borderColor:"#ccc"}}>
        <Picker
       style={{placeholderTextColor:"#909090",paddingBottom:50}}
       selectedValue={selectBusType}
      onValueChange={(e)=>setselectBusType(e)}
       
       >
<Picker.Item label='Select business type' style={{color:"#000"}}></Picker.Item>
 {businesslistdata.map((option, index) => (
          <Picker.Item

            key={index}
            label={option.category_name}
            value={option.id}
            style={{color:"#000",borderWidth:1,borderColor:"red"}}
          
          />
        ))}
       
      </Picker>
      </View>

        <Text style={styles.textHeading}>Pincode</Text>
        <TextInput
          value={pincode}
         
          placeholder="Enter pincode"
          keyboardType="numeric"
          style={styles.inputX}
          onChangeText={(e)=>{setPincode(e); e.length==6&&fetchAddressAutocomplete(e)}}
        />

        <Text style={styles.textHeading}>Latitude</Text>
        <TextInput
          value={latitude}
         
          placeholder="Enter latitude"
          keyboardType="numeric"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>Longitude</Text>
        <TextInput
          value={longitude}
         
          placeholder="Enter longitude"
          keyboardType="numeric"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>State</Text>
        <TextInput
          value={state}
         
          placeholder="Enter state"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>City</Text>
        <TextInput
          value={city}
         
          placeholder="Enter city"
          style={styles.inputX}
        />


<Text style={styles.textHeading}>High Lighted Area</Text>
        <TextInput
          value={highlightedArea}
          
          placeholder="Enter high lighted area"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>Country</Text>
        <TextInput
          value={country}
         
          placeholder="Enter country"
          style={styles.inputX}
        />



        <Text style={styles.textHeading}>Map URL</Text>
        <TextInput
          value={mapUrl}
          onChangeText={setMapUrl}
          placeholder="Enter map URL"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>Business Address</Text>
        <TextInput
          value={businessAddress}
          onChangeText={setBusinessAddress}
          placeholder="Enter business address"
          style={styles.inputXMulit}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.textHeading}>GST</Text>
        <TextInput
          value={gst}
          onChangeText={setGst}
          placeholder="Enter GST"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>PAN No</Text>
        <TextInput
          value={panNo}
          onChangeText={setPanNo}
          placeholder="Enter PAN number"
          style={styles.inputX}
        />


{/* <DateInputExample DateDob={DateDob} setDateDob={setDateDob}></DateInputExample> */}
       
        <Text style={styles.textHeading}>Open Time</Text>
        <TextInput
          value={openTime}
          onChangeText={text => {
            // Ensure only valid time format (HH:mm) is entered
           
              setOpenTime(text);
            
          }}
          placeholder="Enter open time (HH:mm)"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>Close Time</Text>
        <TextInput
          value={closeTime}
          onChangeText={text => {
            // Ensure only valid time format (HH:mm) is entered
            const regex = /^([01]\d|2[0-3]):?([0-5]\d)?$/; // Regex for HH:mm format
            if (regex.test(text) || text === '') {
              setCloseTime(text);
            }
          }}
          placeholder="Enter close time (HH:mm)"
          style={styles.inputX}
        />

        <Text style={styles.textHeading}>Describe Business</Text>
        <TextInput
          value={businessDescription}
          onChangeText={setBusinessDescription}
          placeholder="Describe your business"
          multiline={true}
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            padding: 10,
            marginBottom: 10,
            textAlignVertical: 'top', // Align text to start from the top
          }}
        />

        


          {/* <BusinessImageDocBack LogoUrl={""}></BusinessImageDocBack>
          
          */}




<View style={{flexDirection:"row", paddingVertical:20}}>
<BusinessImage title={"Business Logo"} slug={"business_logo"} Token={LoginState.Token} user={LoginState} Img={Img} loadData={fetchData} ></BusinessImage>

<BusinessImage title={"Business Logo"} slug={"business_documents_front_optional"}  user={LoginState}Token={LoginState.Token} Img={ImgFront} loadData={fetchData} ></BusinessImage>

<BusinessImage title={"Business Logo"} slug={"business_documents_back_optional"} user={LoginState} Token={LoginState.Token} Img={ImgBack} loadData={fetchData} ></BusinessImage>
</View>



<TouchableOpacity onPress={()=>updateData()} style={styles.button}>

          <Text style={styles.buttonTxt}>Submit</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
 
 

  inputMulit: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: 15,
    textAlignVertical: 'top'
  },
  
 
 

  
  inputX: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 23,
    marginBottom: 10,
    fontSize: 15
  },
  textHeading: {
    fontWeight: 'bold',
    color: '#961702',
    fontSize: 15,
    marginBottom: 5,marginLeft:5
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  button:{
    backgroundColor:"#961702",marginBottom:50,color:"white",borderRadius:100
  },
  buttonTxt:{
    backgroundColor:"#961702",textAlign:"center",fontSize:22,padding:5,color:"white"
  }
};

export default BusinessdetailsUpdate;
