import React, { useState } from 'react';
import { View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Duration = ({ options, selectedValue, onValueChange }) => {
  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item key={0}   label="--Select duration--" value={'0'}></Picker.Item>
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option.duration}
            value={option.id}
          />
        ))}
      </Picker>
    </View>
  );
};

export default Duration;


