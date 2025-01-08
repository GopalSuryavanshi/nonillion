import React, { useState } from 'react';
import { View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const City = ({ options, selectedValue, onValueChange }) => {
  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item key={0}   label="--Select--" value={''}></Picker.Item>
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option.city}
            value={option.id}
          />
        ))}
      </Picker>
    </View>
  );
};

export default City;


