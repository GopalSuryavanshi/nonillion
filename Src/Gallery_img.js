// Gallery_img.js
import React from 'react';
import { StyleSheet, View, Image, FlatList, Dimensions } from 'react-native';

const NUM_COLUMNS = 3;

const Gallery_img = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: Dimensions.get('window').width / NUM_COLUMNS - 10,
    height: Dimensions.get('window').width / NUM_COLUMNS - 10,
  },
});

export default Gallery_img;
