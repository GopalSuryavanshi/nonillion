import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SubscriptionCardWithData = ({ packageData }) => {
  const { img, package_name, description, start_date, end_date, features } = packageData;

  // Ensure features are an array of objects
  return (
    <View style={styles.card}>

      
      <View style={styles.header}>
        <Image
          source={{ uri: img }} // Dynamically load the image from URL
          style={styles.icon}
        />
        <Text style={styles.title}>{package_name}</Text>
      </View>
      <Text style={styles.subtitle}>
        {description}
      </Text>
      <View style={styles.dates}>
        <Text style={styles.dateText}>Subscription Start Date: {new Date(start_date).toLocaleDateString()}</Text>
        <Text style={styles.dateText}>Subscription End Date: {new Date(end_date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.featuresTitle}>Features</Text>
      <View style={styles.features}>
        {features && features.length > 0 ? (
          features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              {feature.name}: {feature.description}
            </Text>
          ))
        ) : (
          <Text>No features available</Text>
        )}
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
    color: "#961702",
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

export default SubscriptionCardWithData;
