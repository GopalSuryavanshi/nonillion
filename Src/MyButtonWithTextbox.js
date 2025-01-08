import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MyButtonWithTextbox = () => {
  const [inputText, setInputText] = useState('');

  const handlePress = () => {
    // Do something with the inputText when the button is pressed
    console.log('Input Text:', inputText);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <Text style={styles.buttonText}>Press Me</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default MyButtonWithTextbox;
