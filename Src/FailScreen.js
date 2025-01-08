import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const FailScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your transaction was unsuccessful. Please check your payment details and try again.</Text>
      
      <View style={styles.card}>
      <Image 
        source={require("./assets/Fail.png")} 
        style={styles.image} 
      />
        <Text style={styles.cardTitle}>Payment Failed!</Text>
        {/* <Text style={styles.cardSubtitle}>Purchase was successful</Text> */}

        <Text onPress={() =>navigation.navigate('Packges')} style={{backgroundColor:"#961702",color:"#fff",padding:5,borderRadius:100,paddingHorizontal:50,fontWeight:700}}> GO TO UPGRADE</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b10000',
    marginBottom: 20,
    padding:20,
    textAlign:"center"
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default FailScreen;
