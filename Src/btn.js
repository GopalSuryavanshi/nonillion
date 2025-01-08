import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Btn( {props,bgColor,btnHeight,screenName,  btnLabel, textColor, Press}) {
  return (
    <TouchableOpacity
    onPress={()=>props.navigation.navigate(screenName)}
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