import React, { useEffect } from 'react'
import { PermissionsAndroid, View } from 'react-native'

export const Nofication = () => {
useEffect(() => {
  requestCameraPermission();
}, [])


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Aroundme Business   Notifications Permission',
          message:
            'We use notifications to keep you informed. Please enable notifications to stay updated.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
      } else {
        
      }
    } catch (err) {

    }
  };
  
  return (
    <View>

    </View>
  )
}
