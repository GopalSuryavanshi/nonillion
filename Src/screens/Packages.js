import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FreeListingCard from '../FreeListingCard';
import axios from 'axios';
import { Header } from '../Header';
import { useMyContext } from '../MyContext';

const Packages = ({ navigation, route }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('Monthly'); // Default selection

  const { LoginState } = useMyContext();
  const id = route.params;
  const category_id = id.cat_id.props.category_id;
  console.log('category_id', category_id);

  const fetchPackagesAndData = async (duration) => {
    setLoading(true); // Set loading to true when fetching new data
    try {
      // Determine the URL based on the selected duration
      let url = '';
      if (duration === 'Annually') {
        url = `https://api.aroundme.co.in/businessapp/pacakgeduration/?annual=Annual&category_id=${category_id}`;
      } else if (duration === 'Halfyearly') {
        url = `https://api.aroundme.co.in/businessapp/pacakgeduration/?half=Half-yearly&category_id=${category_id}`;
      } else if (duration === 'Quarterly') {
        url = `https://api.aroundme.co.in/businessapp/pacakgeduration/?quarterly=Quarterly&category_id=${category_id}`;
      } else if (duration === 'Monthly') {
        url = `https://api.aroundme.co.in/businessapp/packages/?category_id=${category_id}`;
      }

      // Fetch packages
      const packagesResponse = await axios.get(url);
      setPackages(packagesResponse.data.results);

      // Fetch subscription data
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/businessapp/subscriptionview/',
        headers: {
          'Authorization': `Bearer ${LoginState.Token}`,
        },
      };
      const dataResponse = await axios.request(config);
      setData(dataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchPackagesAndData(selectedDuration); // Fetch data for the default duration on component mount
  }, [selectedDuration]); // Fetch data when the selected duration changes

  if (loading) {
    return <ActivityIndicator size="large" color="#961702" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration); // Update the selected duration
    // The useEffect hook will trigger fetching the corresponding data
  };

  return (
    <View style={styles.container}>
      <Header Title={'Upgrade Plan'} />

      <View style={styles.durationContainer}>
        <TouchableOpacity onPress={() => handleDurationSelect('Annually')}>
          <Text style={[styles.durationText, selectedDuration === 'Annually' && styles.selected]}>
            Annually
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDurationSelect('Halfyearly')}>
          <Text style={[styles.durationText, selectedDuration === 'Halfyearly' && styles.selected]}>
            Halfyearly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDurationSelect('Quarterly')}>
          <Text style={[styles.durationText, selectedDuration === 'Quarterly' && styles.selected]}>
            Quarterly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDurationSelect('Monthly')}>
          <Text style={[styles.durationText, selectedDuration === 'Monthly' && styles.selected]}>
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 10 }}>
        {packages &&
          packages.sort((a, b) => a.id - b.id).map((pkg) => (
            <FreeListingCard
              plan={data?.data?.[0]?.package_name || 'free'}
              key={pkg.id}
              navigation={navigation}
              data={pkg}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  durationContainer: {
    backgroundColor: '#961702',
    marginTop: 10,
    width: "450",
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  durationText: {
    borderRadius: 2,
    paddingHorizontal: 5,
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    backgroundColor: '#961702', // Default red background
  },
  selected: {
    backgroundColor: 'green', // Green background when selected
  },
});

export default Packages;
