import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BusinessCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>ABC Shoes Mart</Text>
        <View style={{justifyContent:"flex-end"}}>
        <MaterialIcons style={{justifyContent:"center"}} name="edit" size={24} color="#961702" />
        <Text style={styles.gst}>GST No. 0xyrfg9</Text>
        </View>
      </View>
      
      <Text style={styles.subtitle}>Business Type</Text>
    
      <Text style={styles.description}>
        Establishments primarily engaged in the retail sale of men's, women's, and children's footwear, including athletic footwear...
      </Text>
      <View style={styles.info}>
        <FontAwesome name="map-marker" size={24} color="#961702" />
        <Text style={styles.text}>32, Om Nagar, Navi Mumbai, Mumbai, Maharashtra, 4350098</Text>
      </View>
      <View style={styles.info}>
        <MaterialIcons name="access-time" size={24} color="#961702" />
        <Text style={styles.text}>Monday 09:00-20:00</Text>
      </View>
      <TouchableOpacity style={{flexDirection:"row"}} onPress={() => {}}>
      <MaterialIcons name="access-time" size={24} color="#961702" />
        <Text style={styles.link}>dummy+map=1C1CHBF_enINI1037IN037&oq=dummy+map</Text>
      </TouchableOpacity>
      <Text style={styles.pan}>PAN CARD No.: AB4567k</Text>
      <Text style={styles.slug}>Slug: abcdefghgkdd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#D5D5D5',
    margin: 
    40,
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  gst: {
    color: '#961702',
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
    color: '#555',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    marginLeft: 10,
    color: '#555',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  pan: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  slug: {
    color: '#555',
  },
});

export default BusinessCard;
