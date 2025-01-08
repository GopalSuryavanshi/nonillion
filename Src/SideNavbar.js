import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Logout from './Logout';
import { useMyContext } from './MyContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

const SideNavbar = ({ bage,Sidename, setMenu, props }) => {
  const UserIcon = './assets/UserIcon.png';
  const badgesFree = './assets/badgesFree.png';

  const styles = StyleSheet.create({
    Menu: { padding: 12, color: 'white', position: 'relative', marginVertical: 10,fontFamily:"Poppins-Regular" },
    MenuActive: { padding: 12, color: '#961702', backgroundColor: "#fff", fontWeight: "700", position: 'relative', marginVertical: 10 },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1,
    },
    sidebar: {
      borderWidth: 0,
      flex: 1,
      position: 'absolute',
      width: 300,
      height: '100%',
      backgroundColor: '#961702',
      padding: 2,
      zIndex: 2,
    },
  });

  const [dataCategory, setDataCategory] = useState({});
  const { LoginState } = useMyContext();
  const AccessToken = LoginState;
  const [Img, setImg] = useState(null);
  const [BusinessData, setBusinessData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      LoadData();
      GetBusinessData();
    }, [])
  );

  const GetBusinessData = () => {
    axios.get(
      `https://api.aroundme.co.in/businessapp/?id=${LoginState.Busid}`,
      {
        headers: {
          Authorization: `Bearer ${LoginState.Token}`,
        },
      }
    )
      .then((response) => {
        const data = response.data.data;
        setBusinessData(data);
        console.warn(data);
        
      })
      .catch((error) => {
        console.error("Error fetching business data:", error);
      });
  };

  const LoadData = async () => {
    try {
      const apiUrl = `https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=${AccessToken.Mid}`;
      console.log("--------------------" + apiUrl);

      const bearerToken = AccessToken.Token;

      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      });

      setDataCategory(response.data.data);
      setImg(response.data.data.img);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openMerchantProfile = () => {
    console.log(BusinessData);
    console.log(`https://www.aroundme.co.in/${BusinessData.category}/${BusinessData.city_name}/${BusinessData.highlighted_area}/${BusinessData.slug}/`);
    const url = `https://www.aroundme.co.in/${BusinessData.category}/${BusinessData.city_name}/${BusinessData.highlighted_area}/${BusinessData.slug}/`;
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <>
    
      {Sidename && (
        
        <TouchableWithoutFeedback onPress={() => setMenu(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              
              <View style={styles.sidebar}>

              <ScrollView>
                <TouchableOpacity onPress={() => { props.navigation.navigate('UserProfile'); setMenu(false); }}>
                  <View style={{ padding: 10, marginVertical: 20, flexDirection: 'row' }}>
                    <View style={{ borderRadius: 100, borderWidth: 2, backgroundColor: "#f0f0f0", borderColor: '#fff' }}>
                      <Image
                        style={{ padding: 30, borderRadius: 100, height: 55, width: 55 }}
                        source={Img ? { uri: Img } : require(UserIcon)}
                      />
                    </View>
                    <Icon
                      name="camera-alt"
                      size={18}
                      color="#961702"
                      style={{ right: 25, top: 45, borderWidth: 1, height: 23, width: 25, borderColor: '#fff', backgroundColor: '#f9f9f9', borderRadius: 100, textAlign: 'center', padding: 2 }}
                    />
                    <View style={{ flexDirection: 'column', margin: 6, marginVertical: 0 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {dataCategory.name || 'Guest'}
                      </Text>
                      <Text 
  style={{ 
    color: 'white', 
    textTransform: 'capitalize', 
    maxWidth: 200, 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap' 
  }}
>
  {dataCategory.email_optional }
</Text>

                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 20, width: 20 }} source={bage=="free"? require(badgesFree):{uri:bage.img}} />
                        <Text style={{ color: '#fff' }}>{bage=="free"?"free": bage.package_name} </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>



               

                {BusinessData.business_status === "A" && (
                  <TouchableOpacity onPress={openMerchantProfile}>
                    <Text style={styles.MenuActive}>Merchant Profile</Text>
                  </TouchableOpacity>
                )}
                {/*  */}
                

                <TouchableOpacity onPress={() => { props.navigation.navigate('UserProfile'); setMenu(false); }}>
                  <Text style={styles.Menu}>Manage Profile</Text>
                </TouchableOpacity>
               
                {BusinessData.business_status === "A" && (  <TouchableOpacity onPress={() => { props.navigation.navigate('Packges',{data: bage=="free"?"free": bage.package_name}); setMenu(false); }}>
                  <Text style={styles.Menu}>Upgrade Plan</Text>
                </TouchableOpacity>)}

                {BusinessData.business_status === "A" && (
                <TouchableOpacity onPress={() => { props.navigation.navigate('OrderHistory'); setMenu(false); }}>
                  <Text style={styles.Menu}>Order History</Text>
                </TouchableOpacity>)}
                
                {BusinessData.business_status === "A" &&   <TouchableOpacity onPress={() => { props.navigation.navigate('LeadsList'); setMenu(false); }}>
                  <Text style={styles.Menu}>My Leads</Text>

                </TouchableOpacity>}

                <TouchableOpacity onPress={() => { props.navigation.navigate('Inquiry'); setMenu(false); }}>
                  <Text style={styles.Menu}>Enquiry</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { props.navigation.navigate('Managespecification'); setMenu(false); }}>
                  <Text style={styles.Menu}>Manage Specification</Text>
                </TouchableOpacity>

               

               
                {BusinessData.business_status === "A" && <TouchableOpacity onPress={() => { props.navigation.navigate('Faq', { name: BusinessData.category }); setMenu(false); }}>
                  <Text style={styles.Menu}>FAQ</Text>
                </TouchableOpacity>}

                <View style={{  }}>
                  <Logout props={props} />
                </View>


                <TouchableOpacity onPress={()=>props.navigation.navigate("DashboardScreen")}>
                  <Text style={styles.Menu}>{"Version  ("+DeviceInfo.getVersion()+")"}</Text>
                </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
      
    </>
  );
};

export default SideNavbar;
