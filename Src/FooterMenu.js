import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Iconfacebook from 'react-native-vector-icons/FontAwesome';

import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';





const FooterMenu = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('SelasPenal_Dashboard')}
      >
        <Icon name="home" size={24} color={title=="Dashboard"?"#fff":"black"} />
        {/* <Text>Dashboard</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('SelasPenal_all_enquiry')}
      >
        <IconFontAwesome6 name="person-circle-question" size={24} color={title=="Enquiry"?"#fff":"black"} />
        {/* <Text>Enquiry</Text> */}
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('SelasPenal_notification')}
      >
        <Iconfacebook name="bell" size={24} color={title=="notifications"?"#fff":"black"} />
        {/* <Text>Notification</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('SelasPenal_facebook')}
      >
       <Iconfacebook name="facebook" size={24} color={title=="facebook"?"#fff":"black"} />
        {/* <Text>Fb leads</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#961702',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
  },
});

export default FooterMenu;
