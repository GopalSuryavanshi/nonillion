import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
const TestSystm = () => {





    handleGetLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
           console.log({ latitude, longitude });
          },
          (error) => {
            console.warn(`Error getting location: ${error.message}`);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }
  return (
    <>
    <TouchableOpacity onPress={handleGetLocation}>
        <Text>ok</Text>
    </TouchableOpacity>
    
    </>
  )
}

export default TestSystm