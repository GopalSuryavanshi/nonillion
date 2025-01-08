import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const StarRating = () => {
  // State to manage the rating value
  const [rating, setRating] = useState(3); // Set your initial rating

  return (
  
      <AirbnbRating

      starContainerStyle={{borderWidth:0}}
        count={5}            // Number of stars
        defaultRating={3}    // Initial rating value
        size={10}            // Size of the stars
        selectedColor="#FFD700"  // Color of selected stars
        onFinishRating={(value) => setRating(value)} // Function to handle rating change
        reviews={[]} // Text labels for each star
      />
  );
};

export default StarRating;