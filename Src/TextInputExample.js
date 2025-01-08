import React, { useState } from 'react';
import { View, TextInput, Button,Text } from 'react-native';

function TextInputExample() {
  const [text, setText] = useState(''); // Initialize a state variable to hold the input value

  
  const handleButtonPress = () => {
    // Handle the submission or processing of the input text here
    console.log('Input text:', text);
    // You can perform any desired actions with the input text here
  };

  return (
    <View>
      <TextInput
        placeholder="Type something..."
        onChangeText={(newText) => {
            setText(newText); // Update the state with the new input value
        
        }} // Set the event handler for text input changes
        value={text} // Bind the input value to the state variable
      />
      <Text>sds{text.length}</Text>
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
}

export default TextInputExample;
