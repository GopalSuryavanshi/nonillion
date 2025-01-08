import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useMyContext } from './MyContext';

const AddSpecification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { LoginState, updateState } = useMyContext();
  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.aroundme.co.in/businessapp/merchentbusiness-feature/',
      headers: { 
        'Authorization': LoginState.Token
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(config);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Key Field: {item.key_filed}</Text>
      <Text style={styles.itemText}>Key Value: {item.key_value}</Text>
      <Text style={styles.itemText}>Key Field Type: {item.key_filed_type}</Text>
      <Text style={styles.itemText}>Business Details ID: {item.business_details_id}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default AddSpecification;
