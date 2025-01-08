import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionCard = ({price,tr_id,date,mobile,name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Merchant Name: {name}</Text>
      <Text style={styles.text}>Transaction ID: {tr_id}</Text>
      <Text style={styles.text}>Transaction Date: {date}</Text>
      <Text style={styles.text}>Merchant Mobile No: {mobile}</Text>
      <Text style={styles.text}>Transaction Amount: {price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0', // Similar to the background color in the image
    padding: 15,
    borderRadius: 10,
    margin: 10,
    elevation: 2, // For subtle shadow effect on Android
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000', // Black text as in the image
  },
});

export default TransactionCard;
