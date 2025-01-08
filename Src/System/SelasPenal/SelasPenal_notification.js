import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import FooterMenu from '../../FooterMenu';
import SelasHeader from './SelasHeader';

const SelasPenal_notification = () => {
  const notifications = [
    { id: '1', text: 'New message from John Doe' },
    { id: '2', text: 'Your order has been shipped' },
    { id: '3', text: 'Reminder: Meeting at 3 PM' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, borderWidth: 0 }}>
     <SelasHeader title={"Notifications"}></SelasHeader>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FooterMenu title="notifications" />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SelasPenal_notification;
