
import React, { useEffect, useState } from 'react'
import { Text, View ,TextInput,Image,StyleSheet, TouchableOpacity, Button} from 'react-native'
const Pensile='./assets/Pensile.png'
const Downarrow='./assets/Downarrow.png'
const Clock='./assets/icon_clock_.png'
const marker_='./assets/icon_mapmarker_.png'
const icon_globe_='./assets/icon_globe_.png'
const UploadimgImg = './assets/fileUpload.png'

import Businesstypes from './Businesstypes'
import axios from 'axios'
import ImageCropPicker from 'react-native-image-crop-picker'
import BusinessdetailsUpdate from './screen/BusinessdetailsUpdate'







const BusinessDetails = () => {

  const [edit,setedit]=useState(false)



 









  const [selectedValue, setSelectedValue] = useState('option1');








  const [dataCategory, setDataCategory] = useState([]);
  const[PanCard,setPanCard]=useState("")
  useEffect(() => {
   // Define the URL you want to fetch data from
   const apiUrl = 'https://api.aroundme.co.in/webapp/category/'; // Replace with your API endpoint

   // Make the GET request using Axios
   axios.get(apiUrl)
     .then(response => {
       // Handle the successful response here
       setDataCategory(response.data.data);
       console.log(response.data.data);
     })
     .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
     });
 }, []);






  const handleValueChange = (value) => {
    setSelectedValue(value);
  };















///Document Back Update
const [selectedImageDocFront, setselectedImageDocFront] = useState(null);

const [selectedImageDocFrontName, setselectedImageDocFrontName] = useState(null);

const selectImageDocFront = async () => {
  try {
    const image = await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.8,
    });

    setselectedImageDocFront(image);
     const fileName2 = image.path;

     const filePath = fileName2;

// Split the file path by '/' to get an array of path segments
const pathSegments = filePath.split('/');

// The file name should be the last element of the array
const fileName = pathSegments[pathSegments.length - 1];

setselectedImageDocFrontName(fileName);
   } catch (error) {
    setselectedImageDocFront(null);
    console.error(error);
  }
};







///Document Back Update
  const [selectedImageDocBack, setselectedImageDocBack] = useState(null);

  const [selectedImageDocBackName, setselectedImageDocBackName] = useState(null);

  const selectImageDocBack = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        compressImageQuality: 0.8,
      });

      setselectedImageDocBack(image);
       const fileName2 = image.path;

       const filePath = fileName2;

// Split the file path by '/' to get an array of path segments
const pathSegments = filePath.split('/');

// The file name should be the last element of the array
const fileName = pathSegments[pathSegments.length - 1];

setselectedImageDocBackName(fileName);
     } catch (error) {
      setselectedImageDocBack(null);
      console.error(error);
    }
  };






///Logo Update
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





 const BusinessDetailSubmit=()=>{

if(BusinessName.length>4){
 

console.log(selectedValue==""?true:false )

}else{
  setBusinessNameError(true)
}

 }


const [BusinessName,setBusinessName]=useState("");
const [BusinessNameError,setBusinessNameError]=useState(false);

return (
<View style={{flex:1}}> 


<View style={edit==true?{backgroundColor:'#D9D9D9',display:'none'}:{backgroundColor:'#F7F7F'}}>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingTop:10}}> 
<Text style={{fontWeight:700,fontSize:20,color:'#961702'}}>ABC Shoes Mart</Text>

<TouchableOpacity onPress={()=>{setedit(true)}}>
<Image source={require(Pensile)}></Image>
</TouchableOpacity>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}> 
<Text style={{color:'black'}}>Business  Type</Text>


<View style={{flexDirection:'row'}}>
<Text style={{color:'#961702',fontWeight:800}}>GST No.</Text>
<Text> 0xyrfg9</Text>
</View>
</View>


<View>
  <Text style={{padding:20}}>
  Establishments primarily engaged in the retail sale 
of men's, women's, and children's footwear,
including athletic footwear........
  </Text>
</View>



<View style={{width:350,padding:10}}>

<View style={{flexDirection:'row' ,paddingVertical:10}}>
  <Image style={{width:35,height:40,}} source={require(marker_)}>

  </Image>
  <Text style={{fontWeight:'800',paddingHorizontal:30}}>
  32, Om Nagar, Navi mumbai, Mumbai, 
Maharashtra, 4350098
  </Text>
</View>



<View style={{flexDirection:'row',paddingVertical:10}}>
  <Image style={{width:40,height:40,}} source={require(Clock)}>

  </Image>

  <View style={{flexDirection:'row' }}>
  <Text style={{fontWeight:'800',paddingHorizontal:30}}>

  Monday     09:00-20:00       

  </Text>

  <Image style={{paddingHorizontal:10,marginLeft:50}} source={require(Downarrow)}></Image>
  </View>

</View>


<View style={{flexDirection:'row',paddingVertical:10}}>
  <Image style={{width:40,height:40,}} source={require(icon_globe_)}>

  </Image>
  <Text style={{fontWeight:'800',paddingHorizontal:30,color:'#0D6EFD'}}>
  dummy+map=1C1CHBF_enIN1037IN037
&oq=dummy+map
  </Text>
</View>

</View>


<View style={{flexDirection:'row',paddingHorizontal:20,}}>

 <Text style={{color:'#961702',fontWeight:800}}>
 PAN CARD No.  
  </Text> 
  <Text style={{color:'black'}}> 
  : AB4567k
  </Text>
</View>

<View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:100}}>
<Text style={{color:'#961702',fontWeight:800}}>
Slug
  </Text>  
  <Text style={{color:'black'}} >
   : abcdefghgkdd
  </Text>
</View>


</View>






<View style={edit==false?{display:'none'}:{}}>
  <BusinessdetailsUpdate></BusinessdetailsUpdate>
  </View>
</View>
  )
}


const styles = StyleSheet.create({
  BorderStyle: {
    borderWidth:2,borderColor:'#E6E6E6',borderRadius:10,marginVertical:5,justifyContent:'center',alignSelf:'center'
  },
  BorderStyleError: {
    borderWidth:2,borderColor:'#961702',borderRadius:10,marginVertical:5
  },
  
  textBorderStyle: {
    borderWidth:2,borderColor:'#E6E6E6',borderRadius:100,marginVertical:5
  },
  textBorderStyleError: {
    borderWidth:2,borderColor:'#961702',borderRadius:100,marginVertical:5
  },
});

export default BusinessDetails