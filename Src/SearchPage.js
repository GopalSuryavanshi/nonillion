import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.aroundme.co.in/webapp/categoryservices/?location=ameerpet');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const categories = data?.category_data?.map(category => ({
    Type: 'Category',
    category_name: category.category_name,
    category_id: category.id,
  })) || [];

  const businesses = data?.business_active?.map(business => ({
    Type: 'Business',
    business_name: business.business_name,
    business_status: business.business_status,
    city: business.city,
    slug: business.slug,
    area: business.area,
    category: business.category,
    mobile_no: business.mobile_no,
  })) || [];

  const handleSearch = (text) => {
    const searchTerm = text.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredCategories = categories.filter(category =>
      category.category_name.toLowerCase().includes(searchTerm)
    );

    const filteredBusinesses = businesses.filter(business =>
      business.business_name.toLowerCase().includes(searchTerm)
    );

    setFilteredResults([...filteredCategories, ...filteredBusinesses]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => item.Type === 'Category' 
        ? navigation.navigate('CategoryDetails', { categoryName: item.category_name }) 
        : navigation.navigate('BusinessDetails', { category: item.category, city: item.city, area: item.area, slug: item.slug })}
    >
      {item.Type === 'Category' ? (
        <>
          <Icon name="search" style={styles.icon} />
          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>{item.category_name}</Text>
            <Text style={styles.resultSubtitle}>category</Text>
          </View>
        </>
      ) : (
        <>
          <Icon name="photo-camera" style={styles.icon} />
          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>{item.business_name}</Text>
            <Text style={styles.resultSubtitle}>{item.city}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  resultsContainer: {
    maxHeight: '70%',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 10,
    fontSize: 24,
  },
  resultText: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultSubtitle: {
    fontSize: 14,
  },
});

export default SearchPage;
