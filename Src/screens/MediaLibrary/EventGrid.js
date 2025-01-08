import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const events = [
  { name: 'Ganesh Chaturthi', image: 'https://via.placeholder.com/150x150?text=Ganesh' },
  { name: "Teacher's Day", image: 'https://via.placeholder.com/150x150?text=Teacher' },
  { name: "Engineer's Day", image: 'https://via.placeholder.com/150x150?text=Engineer' },
  { name: 'Diwali', image: 'https://via.placeholder.com/150x150?text=Diwali' },
  { name: 'Durga Puja', image: 'https://via.placeholder.com/150x150?text=Durga' },
  { name: 'Christmas', image: 'https://via.placeholder.com/150x150?text=Christmas' },
];

const EventGrid = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {/* <Text style={styles.text}>{item.name}</Text> */}
    </View>
  );

  return (
    <View>
        <Text style={{color:"#000",marginLeft:22,fontWeight:"800"}}>TRENDING NOW</Text>
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3} // Display items in 3 columns
      contentContainerStyle={styles.grid}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10, // Add rounded corners to the image
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default EventGrid;
