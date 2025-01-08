import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = () => {
  const [otp, setOtp] = useState('');

  const handleChangeText = (text) => {
    // Ensure only a single numeric character is entered
    const filteredText = text.replace(/[^0-9]/g, '');
    setOtp(filteredText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeText}
        value={otp}
        keyboardType="numeric"
        maxLength={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 40, // Adjust width as needed
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default OTPInput;


