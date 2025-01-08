import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (

    <TouchableOpacity style={{}} onPress={toggleCheckbox}>
    <View style={{flexDirection:'row',alignSelf:'flex-start',width:'100%',marginHorizontal:10 , }} >
      <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
        {isChecked && <Text style={{color:'white', }}>✔ </Text>}

      </View>
      <View style={{  marginLeft:5}}>
      <Text style={{color:'black'}}>Remember me</Text>  
      </View>   
      </View> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#961702',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
},
  checked: {
fontSize:2,
    borderRadius:5,
    paddingBottom:2,
    backgroundColor: '#961702',
  },
});

export default CustomCheckbox;
