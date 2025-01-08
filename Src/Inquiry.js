import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import { Header } from './Header';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { useMyContext } from './MyContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Inquiry = () => {
  const { LoginState } = useMyContext();
  const [Token, setToken] = useState(LoginState.Token);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    
      fetchData(LoginState.Token);
    

    
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = data.filter(item => {
      const name = item.name ? item.name.toLowerCase() : '';
      const ph = item.ph ? item.ph.toLowerCase() : '';
      const email = item.email ? item.email.toLowerCase() : '';
      const description = item.description ? item.description.toLowerCase() : '';
      
      return (
        name.includes(query) ||
        ph.includes(query) ||
        email.includes(query) ||
        description.includes(query)
      );
    });
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const fetchData = async (token) => {
    const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/inquiryViews/?id='+LoginState.Busid
    console.log(API_ENDPOINT)
    const headers = {
      'Authorization': 'Bearer ' + token,
    };

    try {
      const response = await axios.get(API_ENDPOINT, { headers });
      setData(response.data.data);
      console.log(response.data.data)
      console.log("ok")
    } catch (error) {
      console.error('API Error:', error);
      // Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  };

  const displayValue = (value) => {
    return value ? value : '--';
  };

  const handlePhonePress = (phone) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleEmailPress = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <View style={{flex:1}}>
        <Header Title={'Total Enquiry'} />
   
    <View style={styles.container}>
    
      <TextInput
      placeholderTextColor={"#808080"}
        style={styles.searchInput}
        placeholder="Search by Name, Mobile, Email, or Query"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.text}>{displayValue(item.name)}</Text>
              </View>
              <View>
                <Text style={[styles.label,{borderWidth:0,textAlign:"right"}]}>Phone</Text>
                <TouchableOpacity onPress={() => handlePhonePress(item.ph)}>
                  <View style={styles.iconRow}>
                    <Icon name="phone" size={20} color="#961702" />
                    <Text style={styles.text}>{displayValue(item.ph)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Email</Text>
                <TouchableOpacity onPress={() => handleEmailPress(item.email)}>
                  <View style={styles.iconRow}>
                    <Icon name="envelope" size={20} color="#961702" />
                    <Text style={styles.text}>{displayValue(item.email)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text  style={[styles.label,{borderWidth:0,textAlign:"right"}]}>Date</Text>
                <Text style={styles.text}>{new Date(item.datetime).toLocaleDateString('en-GB')}</Text>
              </View>
            </View>
            <Text style={styles.label}>Query</Text>
            <Text style={styles.queryText}>{displayValue(item.description)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    paddingTop: 10,
  },
  searchInput: {
     color:"#808080",
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 5,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#961702',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 5,
  },
  queryText: {
    
    backgroundColor: '#ffff',
    fontSize: 16,
    color: '#333333',
    marginTop: 0,
  },
});

export default Inquiry;
