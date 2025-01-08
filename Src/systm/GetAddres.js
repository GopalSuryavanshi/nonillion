import React,{useState} from 'react'
import {TextInput, Text,View } from 'react-native'


export const GetAddres = () => {

   

      
  return (
    <View>
        <Text onPress={()=>reverseGeocode(24.5903378,73.7187167)}>{"abc"}
       
        
        </Text>

        
        <Text onPress={()=>teststing()}>{"test"}
       
ssds        
        </Text>

        <TextInput
       
       style={{width:100,borderWidth:1}}
        value={ JSON.stringify(state)}
      />

    </View>
  )
}
