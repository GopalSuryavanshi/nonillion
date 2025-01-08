import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const SuccessScreen = ({ navigation }) => {
  const handleDonePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Dashboard', params: { refresh: true } }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank you for promoting with us</Text>
      
      <View style={styles.card}>
        <Image 
          source={require("./assets/Thankyou.png")} 
          style={styles.image} 
        />
        <Text style={styles.cardTitle}>Thank you!</Text>
        <Text style={styles.cardSubtitle}>Purchase was successful</Text>

        <Text 
          onPress={handleDonePress} 
          style={styles.doneButton}
        >
          Done
        </Text>
        
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
  doneButton: {
    backgroundColor: '#961702',
    color: '#fff',
    padding: 5,
    borderRadius: 100,
    paddingHorizontal: 50,
    fontWeight: '700',
  },
});

export default SuccessScreen;
