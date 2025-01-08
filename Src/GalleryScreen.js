import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useMyContext } from './MyContext';
import axios from 'axios';
import ImagePreviewModal from './ImagePreviewModal';
import { Card } from 'react-native-elements';

const { width } = Dimensions.get('window');

const GalleryScreen = ({loader}) => {
  const { LoginState } = useMyContext();
  const { Busid, Token } = LoginState;

  const [data, setData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchData();
  }, [loader]);

  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };

  const fetchData = async () => {
    try {
      const apiUrl = `https://api.aroundme.co.in/businessapp/BusinessGalleryView/?business_details_id=${Busid}`;
      
      const response = await axios.get(apiUrl, config);
      setData(response.data.data);
    } catch (error) {
      setData([])
      console.error('Error fetching data:', error);
    }
  };

  const handlePreviewImage = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };


  
  const handleDelete = async(itemId) => {

    let data = {
      "ids": [itemId]
    };
  
   
    try {
        // Make a POST request to the API endpoint
        const response = await axios.delete('https://api.aroundme.co.in/businessapp/BusinessGallery/delete/',{
          headers: {
            Authorization: `Bearer ${Token}`
           },
          data : data
        });
    
        // Handle the API response
        console.log('API Response:', response.data);
       
        fetchData();
       
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        fetchData();
      }finally{
        getGalleryData();
        fetchData();
      }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePreviewImage(item.image_gallery)}>
            <Card containerStyle={{padding:0}}>
             
            <Image source={{ uri: item.image_gallery }} style={styles.image} />
            <TouchableOpacity onPress={()=>handleDelete(item.id)} style={{backgroundColor:"#961702",height:20,bottom:3,borderRadius:10,margin:5,justifyContent:"center"}}>
              <Text style={{color:"white",justifyContent:"center",textAlign:"center",}}>Remove</Text>
            </TouchableOpacity>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ImagePreviewModal visible={previewVisible} imageUrl={previewImage} onClose={handleClosePreview} />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:0,
  },
  image: {
    width: width / 4 - 3,
    height: width / 4 - 5,
    margin: 2,
  
  },
});

export default GalleryScreen;
