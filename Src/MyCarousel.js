import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useMyContext } from './MyContext';

const screenWidth = Dimensions.get('window').width;

const MyCarousel = () => {
  const { LoginState } = useMyContext();
  const AccessToken = LoginState;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${AccessToken.Token}`,
    },
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    LoadData();
  }, []);

  const busiDetailsIDGlobal = AccessToken.Busid;

  const LoadData = async () => {
    try {
      const apiurl = `https://api.aroundme.co.in/businessapp/BusinessGalleryView/?business_details_id=${busiDetailsIDGlobal}`;
      const response = await axios.get(apiurl, axiosConfig);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 250,
      marginTop: 50,
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
      width: screenWidth * 0.8, // Less than full width to show previews
    },
    image: {
      width: screenWidth * 0.6, // Smaller width for central image
      height: 200,
      borderRadius: 20,
      resizeMode: 'cover',
    },
    text: {
      marginTop: 10,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false} // Hide left and right arrows
        loop={true}
        width={screenWidth} // Full width of the screen
        containerStyle={{ paddingHorizontal: 0 }} // Remove padding for full width
        autoplay={true}
        autoplayTimeout={3}
        paginationStyle={{ bottom: -20 }}
        activeDotStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: 10, height: 10, borderRadius: 5 }}
        dotStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', width: 10, height: 10, borderRadius: 5 }}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.image_gallery }} style={styles.image} />
            <Text style={styles.text}>{item.Category_Image}</Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default MyCarousel;
