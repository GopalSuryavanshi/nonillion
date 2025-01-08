import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Header } from '../Header';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useMyContext } from '../MyContext';


const OrderHistory = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { LoginState, updateState } = useMyContext();

  console.log(LoginState)

  useEffect(() => {
    const fetchOrders = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/businessapp/transcationview/',
        headers: { 
          'Authorization': `Bearer ${LoginState.Token}`  // Updated authorization token
        }
      };

      try {
        const response = await axios.request(config);
        console.log('Response:', response);  // Log the response for debugging
        const fetchedOrders = response.data.data.map(order => ({
          id: order.id,
          OrderID: order.tr_id,
          businessName: order.businessname,
          package: order.plan,
          purchaseDate: new Date(order.date).toISOString().split('T')[0],
          expiryDate: order.expire_date,
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error Response:', error.response);  // Log the error response for debugging
        if (error.response && error.response.status === 401) {
          setError('Unauthorized: Please check your token.');
        } else {
          setError('An error occurred while fetching orders.');
        }
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header Title={"Order History"} />
      <View style={styles.searchContainer}>

        {/* <SearchPage></SearchPage> */}
        {/* <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} /> */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Business Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#808080"
        />
    
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView style={{ padding: 0 }}>
          {filteredOrders.map((order, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>Transaction ID: {order.OrderID}</Text>
              <Text style={styles.detail}>Business Name: {order.businessName}</Text>
              <Text style={styles.detail}>Package: {order.package}</Text>
              <Text style={styles.detail}>Purchase Date: {order.purchaseDate}</Text>
              <Text style={styles.detail}>Expiry Date: {order.expiryDate}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('InvoiceScreen', { orderId: order.id })}
              >
                <Text style={styles.buttonText}>View Invoices</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
     color:"#808080"
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#808080"
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
     color:"#808080"
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderHistory;
