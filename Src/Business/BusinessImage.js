import axios from 'axios';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';

const Logo = '../assets/UserProfile.png';

const BusinessImage = ({Img,loadData ,Token,title,slug,user}) => {
    const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImageName, setSelectedImageName] = useState(null);

  const selectImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
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
        formData.append(slug, {
          uri: image.path,
          type: image.mime,
          name: fileName,
        });
      }

  
      const headers =  {
        Authorization: `Bearer ${Token}`
      }
      // Make an Axios POST request to your registration API endpoint
      const response = await axios.put('https://api.aroundme.co.in/businessapp/edit/'+user.Busid+'/', formData, { headers });

      // Handle the response from your server
      
      loadData();
      console.log(response.status)
     
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  return (
    
<View style={{marginHorizontal:2,borderWidth:1,padding:5}}>

<Image onPress={()=>selectImage()} style={{borderWidth:0,width:100,height:100,borderRadius:100}}  source={Img==null||Img==""?require(Logo):{uri:Img}}></Image>
<Text style={{color:"black"}}>{title}</Text>
</View>
  )
}

export default BusinessImage