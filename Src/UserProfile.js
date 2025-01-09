import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
//import BusinessCard from './BusinessCard';
import axios from 'axios';
import { useMyContext } from './MyContext';
import ImageGrid from './ImageGrid';
import PersonalInfo from './Business/PersonalInfo';
import BusinessInfo from './Business/BusinessInfo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from './Header';

const UserProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Business Details');
  const [GalleryData, setGalleryData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const { LoginState, updateState } = useMyContext();
  const AccessToken = LoginState;
  const [Img, setImg] = useState(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [data, setdata] = useState([]);

  useFocusEffect(
    useCallback(() => {
      LoadData();
      getGalleryData();
    }, [])
  );

  const LoadData = async () => {
    try {
      const apiUrl = 'https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=' + AccessToken.Mid;
      console.log("--------------------" + apiUrl);
      const bearerToken = AccessToken.Token;

      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      });

      setdata(response.data.data);
      setDataCategory(response.data.data);
      console.log(response.data.data);
      setImg(response.data.data.img);
      setname(response.data.data.name == null ? "Guest" : response.data.data.name);
      setemail(response.data.data.email_optional);
    } catch (error) {
      console.error('Error fetching dataXX:', error);
    }
  };

  const getGalleryData = () => {
    axios
      .get(
        "https://api.aroundme.co.in/businessapp/BusinessGalleryView/?business_details_id=" +
        LoginState.Busid,
        {
          headers: {
            Authorization: `Bearer ${LoginState.Token}`,
          },
        }
      )
      .then((response) => {
        setGalleryData(response.data.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Bank Details':
        return <Text>Bank details content goes here</Text>;
      case 'Business Details':
        return (
          <>
            <PersonalInfo data={dataCategory}></PersonalInfo>
            <BusinessInfo></BusinessInfo>
          </>
        );
      case 'Business Gallery':
        return (
          <View style={styles.galleryContainer}>
            <ImageGrid businessDetailsId={LoginState.Busid} token={LoginState.Token}></ImageGrid>
            <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); // This function will navigate back to the previous screen
  };

  return (
    <View style={{ flex: 1 }}>

<Header  />

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('./assets/Gymimg.png')} style={styles.headerImage} />
        {/* <TouchableOpacity style={{borderWidth:1, alignSelf:'flex-start', position:'absolute',top:'2%'}}>
          <Image source={require('./assets/Backarrow.png')} />
        </TouchableOpacity> */}



        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.shadowBox} onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="camera-alt" size={18} color="#961702" style={styles.cameraIcon} />
            <Image
              style={styles.profileImage}
              source={Img == null || Img == "" ? require("./assets/UserIcon.png") : { uri: Img }}
            />
            <Text style={styles.profileName}>{dataCategory.name}</Text>
            <Text style={styles.profileEmail}>{dataCategory.email_optional}</Text>
          </TouchableOpacity>

          <View style={styles.tabContainer}>
            {/* <TouchableOpacity style={{ borderEndWidth: 1 }} onPress={() => setActiveTab('Bank Details')}>
              <Text style={[styles.tab, activeTab === 'Bank Details' && styles.activeTab]}>Bank Details</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setActiveTab('Business Details')}>
              <Text style={[styles.tab, activeTab === 'Business Details' && styles.activeTab]}>Business Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Business Details')}>
              <Text style={{ height: 42, backgroundColor: "#000", width: 1, borderWidth: 0 }}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ borderStartWidth: 0 }} onPress={() => setActiveTab('Business Gallery')}>
              <Text style={[styles.tab, activeTab === 'Business Gallery' && styles.activeTab]}>Business Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ borderWidth: 0, top: -90 }}>
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    width: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 5,
    bottom: 90,
    width: 320,
    backgroundColor: 'white',
    marginHorizontal: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 54,
    },
    shadowOpacity: 0.25,
    shadowRadius: 55,
    borderRadius: 10,
    elevation: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    top: -25,
    backgroundColor: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    top: -30,
    textTransform: "capitalize"
    , color: 'gray'
  },
  profileEmail: {
    // textTransform: "capitalize",
    top: -35,
    fontSize: 16,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
    top: -15,
    borderWidth: 0
  },
  tab: {
    fontSize: 16,
    color: 'gray',
    width: 80,
    textAlign: 'center', borderWidth: 0
  },
  activeTab: {
    color: '#961702',
    borderWidth: 0
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  addButton: {
    position: 'absolute',
    top: 350,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#961702',
    justifyContent: 'center',
    alignItems: 'center',

  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  shadowBox: {
    width: '90%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cameraIcon: {
    left: 32,
    zIndex: 5,
    top: 72,
    borderWidth: 1,
    height: 25,
    width: 25,
    borderColor: "#000",
    paddingTop: 3,
    backgroundColor: "#f9f9f9",
    borderRadius: 100,
    textAlign: "center",
    padding: 2
  },
});

export default UserProfile;
