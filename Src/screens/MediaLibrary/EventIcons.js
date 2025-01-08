import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EventIcons = () => {
  const events = [
    { name: 'Ganesh chathurthi', image: 'https://via.placeholder.com/80' },
    { name: "Teacher's Day", image: 'https://via.placeholder.com/80' },
    { name: "Engineer's Day", image: 'https://via.placeholder.com/80' },
    { name: 'Dasara', image: 'https://via.placeholder.com/80' },
    { name: 'Diwali', image: 'https://via.placeholder.com/80' },
    { name: 'More', image: 'https://via.placeholder.com/80' },
  ];

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      
      {events.map((event, index) => (
        <TouchableOpacity key={index} style={styles.itemContainer}>
          <Image source={{ uri: event.image }} style={styles.iconImage} />
          <Text style={styles.iconText}>{event.name}</Text>
        </TouchableOpacity>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    backgroundColor:"#fff",
    borderTopLeftRadius:60,padding:10,
    paddingLeft:60,
    height:100,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 40, // This makes the image circular
    borderWidth: 2,
    borderColor: '#000', // Customize the border as needed
  },
  iconText: {
    marginTop: 8,
    fontSize: 8,
    textAlign: 'center',
    color:"#000"
  },
});

export default EventIcons;
