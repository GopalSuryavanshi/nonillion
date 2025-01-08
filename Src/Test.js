import React,{useState,useEffect} from 'react'
import { Text, View,TextInput, Touchable, TouchableOpacity,Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary} from 'react-native-image-picker';


import{androidCameraPermission} from '../permissions'
import Businessgallery from './Businessgallery';
const Gym46 = './assets/UserProfile.png'



const Test = ({navigation}) => {
  
  const [Token,setToken]=useState("ok");
  const getData=async()=>{
    const name=  await AsyncStorage.getItem("Token")
    setToken(name)
  }


  const onSelectImage=async()=>{
   const permissionStatus=await androidCameraPermission()

   



   
  }

  const options={
    title: 'Take Image',
     type: 'capture',
    options: {
     saveToPhotos: true,
     mediaType: 'photo',
     includeBase64: false,
    
   },
 
}

 
  
  useEffect(() => {
    getData();
  }, [])
  
  


  const formData = new FormData();
  formData.append('img', ImageFile);
  


  const [ImageFile, setImageFile] = useState({
    uri: '',
    name: '',
    type: '',
  });
  
  // Example field
  // formData.append('file', {
  //   uri: 'file://path/to/your/file.jpg', // Replace with the actual file path
  //   type: 'image/jpeg',                  // Adjust the content type as needed
  //   name: 'file.jpg',                    // File name
  // });
  

  const testBtn=()=>{
    axios.post('https://api.aroundme.co.in/businessapp/file/add/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data', // Important to set the correct content type
  },
})
.then(response => {
  // Handle the response
  console.log('Response:', response.data);
})
.catch(error => {
  // Handle errors
  console.error('Error:', error);
});
  }





  
  const OpenGallray=async()=>{
    const result = await launchImageLibrary(options);
    console.log(result);
    
    setImageFile({ ...ImageFile, type: result.assets[0].type, uri: result.assets[0].uri,name: result.assets[0].fileName });




}





















const selectAndCropImage = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then((image) => {
    // Handle the cropped image
    setimg(Img)
   
  });
};




const uploadCroppedImage = (image) => {

  const formData = new FormData();

  formData.append('title', 'Inquery');
  formData.append('description', 'How Get servic Spa');
  formData.append('order_status', '');
  formData.append('inquiry_id', '');
  formData.append('user_id', 'test');

  formData.append('img', {
    uri: image.path,
    type: image.mime,
    name: 'image.jpg',
  });

  axios
    .post('https://api.aroundme.co.in/businessapp/notificationview/add/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Image uploaded successfully:', response.data);
    })
    .catch((error) => {
      console.error('Image upload failed:', error);
    });
};



const [Img,setimg]=useState(null)

//  const  uploadFile=async()=> {
//   const formData = new FormData();

//   data.append('title', 'Inquery');
//   data.append('description', 'How Get servic Spa');
//   data.append('order_status', '');
//   data.append('inquiry_id', '');
//   data.append('user_id', 'test');

//   formData.append('file', {
//     uri: Gym46,
//     type: ".png",
//     name: "UserProfile.png",
//   });

//   try {
//     const response = await axios.post('https://api.aroundme.co.in/businessapp/notificationview/add/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('File uploaded successfully:', response.data);
//   } catch (error) {
//     console.error('File upload failed:', error);
//   }
// }












  return (
    <View>

<Text>fdfd</Text>
<Businessgallery props={navigation}></Businessgallery>

<Image height={100} width={100} source={{uri:ImageFile.uri}}></Image>


<TouchableOpacity onPress={onSelectImage}>
  <Text style={{backgroundColor:'blue',padding:10,borderRadius:10,justifyContent:'center',alignSelf:'center',color:'white'}}>Browse photos</Text>
</TouchableOpacity>
      


<TouchableOpacity style={{backgroundColor:'red'}} onPress={()=>selectAndCropImage()}>

<Text>sdsds Okk</Text>
 

</TouchableOpacity>
      
<Text>Test btn {JSON.stringify(ImageFile)}</Text>

      


<TouchableOpacity onPress={testBtn}>
  <Text style={{backgroundColor:'blue',padding:10,borderRadius:10,justifyContent:'center',alignSelf:'center',color:'white'}}>Upload Server </Text>
</TouchableOpacity>
        {/* <Text>{Token}</Text> */}

{/* 
        <Text>{JSON.stringify(headers)}</Text>

  <TextInput value={JSON.stringify(headers)}></TextInput>     

  <TextInput value={JSON.stringify(headers2)}></TextInput>      */}

    </View>
  )
}

export default Test