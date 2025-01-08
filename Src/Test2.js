import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios, { Axios } from 'axios';

function Test2() {
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
   
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async () => {
    try {
      // Construct the form data for registration
      const formData = new FormData();
     
  formData.append('Business_Details', 'Inquery');
  formData.append('description', 'How Get servic Spa');
  formData.append('order_status', '');
  formData.append('inquiry_id', '');
  formData.append('user_id', 'test');


      // Append the image to the form data
      if (selectedImage) {
        formData.append('img', {
          uri: selectedImage.path,
          type: selectedImage.mime,
          name: selectedImageName,
        });
      }

      // Make an Axios POST request to your registration API endpoint
      const response = await axios.post('https://api.aroundme.co.in/businessapp/notificationview/add/', formData);

      // Handle the response from your server
      console.log(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Name: John Doe</Text>
      <Text>Email: johndoe@example.com</Text>

      {selectedImage && (
        <>
        <Image source={{ uri: selectedImage.path }} style={{ width: 300, height: 400 }} />
          <Text>{JSON.stringify(selectedImage) }</Text>

</>

      )}

      <Button title="Select Image" onPress={selectImage} />
      <Button title="Register" onPress={registerUser} />
    </View>
  );
}

export default Test2;
