import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const HelpScreen = () => {
  const Support = './assets/Support.png';
  const phoneNumber = '9392080762';
  const navigation = useNavigation();
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleDashboardPress = () => {
    // Add your dashboard navigation logic here
    console.log('Navigate to Dashboard');
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Image
        style={styles.image}
        source={require(Support)} // Replace with your image URI
      />
      <Text style={styles.description}>
        To upgrade, please call customer care at 
      </Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleCallPress}>
          <Icon name="call" size={24} color="white" />
          <Text style={styles.ctaText}>Call Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardButton} onPress={handleDashboardPress}>
          {/* <Icon name="home" size={24} color="white" /> */}
          <Text style={styles.ctaText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: '',
    marginBottom: 20,
    fontFamily:"Poppins-Regular"
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 18,
    
    marginTop: 10,
    fontFamily:"Poppins-Regular"
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#961702',
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Adds space between buttons
  },
  dashboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#961702',
    padding: 10,
    borderRadius: 5,
    fontFamily:"Poppins-Regular"
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontFamily:"Poppins-Regular"
  },
});

export default HelpScreen;
