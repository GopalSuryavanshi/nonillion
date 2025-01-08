import React,{useState} from 'react'
import {TextInput, Image, Text, TouchableOpacity, View } from 'react-native'
import { launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Header } from './Header';
import { Button } from 'react-native-elements';
import axios, { Axios } from 'axios';
import { useMyContext } from './MyContext';
import GalleryScreen from './GalleryScreen';
import FullScreenDataLoader from './System/FullScreenDataLoader';


const UploadimgImg = './assets/fileUpload.png'
const Backarrow='./assets/Backarrow.png'






const Uploadimg = (props) => {
   

  



  const { LoginState, updateState } = useMyContext();
  const AccessToken=LoginState ;


  console.log();
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
      console.error(error);
    }
  };

  const registerUser = async (fileName,image) => {
    setLoader(true)
    console.log(AccessToken.Busid+"okkkkkkk");
    try {
      // Construct the form data for registration
      const formData = new FormData();
      
      formData.append('business_details_id',AccessToken.Busid);



     
      // Append the image to the form data
      if (image) {
        formData.append('image_gallery', {
          uri: image.path,
          type: image.mime,
          name: fileName,
        });
      }

     
      const headers = {
        'Authorization': `Bearer ${AccessToken.Token}`,
        'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for form data
      };
      // Make an Axios POST request to your registration API endpoint
      const response = await axios.post('https://api.aroundme.co.in/businessapp/BusinessGallery/add/', formData, { headers });

      // Handle the response from your server
      console.log(response.data);

      setLoader(false)
     
    } catch (error) {
      // Handle any errors
      setLoader(false)
      console.error(error);
    }
  };

  const[loader,setLoader]=useState(false)

  return (

    <View style={{flex:1,backgroundColor:'white'}}>
      <Header Title={'Business gallery'}></Header>
    <View style={{paddingHorizontal:10,padding:10,justifyContent:'center',alignSelf:'center'}}>




            <TouchableOpacity onPress={()=>selectImage()}>
                  
                  <Image source={require(UploadimgImg)}></Image>
           </TouchableOpacity>
    
    
   







     




    </View>
   
   <GalleryScreen loader={loader}></GalleryScreen>

   {loader&& <FullScreenDataLoader ></FullScreenDataLoader>
}</View>
  )
}

export default Uploadimg