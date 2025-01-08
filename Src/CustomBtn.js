import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomBtn( {method,bgColor,btnHeight,screenName,  btnLabel, textColor, Press}) {
  return (
    <TouchableOpacity
    onPress={()=>method()}
      style={{
        backgroundColor: bgColor,
        borderRadius: 8,
        alignItems: 'center',
        
        paddingVertical: 2,
        paddingHorizontal:50,
        marginVertical: 10,
        height:35,

        
      }}>
      <Text  style={{ color: textColor, fontSize: 20, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
