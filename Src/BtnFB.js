import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function BtnFB({ bgColor, style, btnLabel, textColor, Press, btnUrl }) {
  const Glurl = './assets/Google.png'
  const FBUrl = './assets/Fbbtn.png'
  return (
    <TouchableOpacity
      onPress={Press}

      style={{
        backgroundColor: bgColor,
        borderRadius: 8,
        alignItems: 'center',
        width: 320,
        paddingVertical: 2,
        marginVertical: 10,
        paddingStart:15

      }}>


      <View style={{ flexDirection: 'row', padding: 2,alignSelf:'flex-start' }}>
        <View style={{ paddingHorizontal: 15, padding:5}}> 
          <Image source={'FB' == btnUrl ? require(FBUrl) : require(Glurl)}></Image>
        </View>
        <Text style={{ paddingVertical:8 , color: textColor, fontSize: 15, fontWeight: 'bold' }}>
          {btnLabel}

        </Text>
      </View>
    </TouchableOpacity>
  );
}