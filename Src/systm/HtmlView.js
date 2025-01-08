import React from 'react';
import { View,ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

const HtmlView = ({data}) => {
  const htmlContent = '<p>Hello <strong>world</strong></p>';

  return (
    <ScrollView >
      <HTML  source={{ html: data }} />
    </ScrollView>
  );
};

export default HtmlView;
