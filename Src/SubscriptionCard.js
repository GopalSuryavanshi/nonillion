import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SubscriptionCard = () => {
  const Packge = './assets/badgesFree.png';
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require(Packge)} // Replace with your image URL
          style={styles.icon}
        />
        <Text style={styles.title}>Free</Text>
      </View>
      <Text style={styles.subtitle}>
      Kickstart Your Business with Our Free Package!


      </Text>
      {/* <View style={styles.dates}>
        <Text style={styles.dateText}>Subscription Start Date :{"10-09-2024"}</Text>
        <Text style={styles.dateText}>Subscription End Date :{"10-10-2024"}</Text>
      </View> */}
      <Text style={styles.featuresTitle}>Features</Text>
      <View style={styles.features}>
       
        <Text style={styles.featureItem}>Claim Profile</Text>
        <Text style={styles.featureItem}>Verified Badge</Text>
        <Text style={styles.featureItem}>24/7 Customer Support</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B71C1C',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  dates: {
    marginVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color:"#961702"
  },
  features: {
    paddingLeft: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
});

export default SubscriptionCard;
