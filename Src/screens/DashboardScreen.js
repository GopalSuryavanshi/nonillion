import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import LineChartData from '../LineChartData';
import MenuBar from '../MenuBar';
import DashboardGrid from './Dashboard/DashboardGrid';

import { useMyContext } from '../MyContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SideNavbar from '../SideNavbar';



const DashboardScreen = (props) => {

 

  
  const { LoginState ,updateState} = useMyContext();
  const AccessToken = LoginState;

  
 

  const Hamburger = '../assets/Hamburger.png';
  const Bookpen = './assets/Bookpen.png';
  const Logo = './assets/Logo.png';

  const Search = './assets/Search.png';
  const Newbusiness = './assets/Newbusiness.png';

  const navigation = useNavigation();
  const[Sidename,setSideNav]=useState(false)

 useEffect(() => {
  GetBusinessData()
 }, [])
 




 const[Leads,setLeads]=useState([]);
 const [imageError, setImageError] = useState(false);

 useEffect(() => {


 
  const fetchLeads = async () => {
    try {
      const response = await axios.get('https://api.aroundme.co.in/businessapp/facebookleadview/list', {
        headers: {
          'Authorization': `Bearer ${LoginState.Token}`
        }
      });
      setLeads(response.data.data[0]);
      console.log(response.data.data[0]);
      
    } catch (error) {
      
    }
  };
  fetchLeads();
}, []);


 const handleLogout = async () => {
   try {
     await AsyncStorage.removeItem('LoginState');
     updateState({});
    
     navigation.reset({
       index: 0,
       routes: [{ name: 'Home' }],
     });
   } catch (error) {
     console.error('Error clearing login state:', error);
   }
 };


 const GetBusinessData = () => {
console.log("xxxxx")
  console.log(`https://api.aroundme.co.in/businessapp/?id=${LoginState.Busid}`)
  axios
    .get(`https://api.aroundme.co.in/businessapp/?id=${LoginState.Busid}`, {
      headers: {
        Authorization: `Bearer ${LoginState.Token}`,
      },
    })
    .then((response) => {
      const data = response.data.data;
      console.warn(data)
      if (data.business_status == "I") {
        //  props.navigation.navigate("UserProfile");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        handleLogout()
      } else {
        console.error("Error fetching business data:", error);
      }
    });
};



const[NameBus,setNameBus]=useState([]);

const OwnerABC = () => {
  axios
    .get('https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=' + LoginState.Mid, {
      headers: {
        Authorization: `Bearer ${LoginState.Token}`,
      },
    })
    .then((response) => {
      const data = response.data.data;
      
      setNameBus(data)
     
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        handleLogout()
      } else {
        console.error("Error fetching business data:", error);
      }
    });
};




  const[data,setData]=useState([]);

  useEffect(() => {
    OwnerABC();
    const makeRequest = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/businessapp/subscriptionview/',
        headers: { 
          'Authorization': `Bearer ${LoginState.Token}`
        }
      };

      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));

        setData(response.data)
      }
      catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);
   





  useEffect(() => {
    
    
  
   
    const sendRequest = async () => {
      let data =  JSON.stringify({
        "token":LoginState.FCM,
        "user": LoginState.id
      });

     

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/login/device-create',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data
      };

     
      try {
       
        const response = await axios.request(config);
        console.warn("ok")
      } catch (error) {
        console.log(error)
        console.error("sds"+error);
      }
    };

    sendRequest();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header Section */}

      <ScrollView style={{flex:1}}>

      
      <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-between"}}>
       
      
     
      <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.01, y: 0 }}
        style={styles.header}
      >
        
        <View style={{bottom:0,flexDirection:"row",borderWidth:0,width:"100%"}}>
      
       {/* <Image source={require("../assets/Menu/Linebar.png")} style={{height:25,width:25}}></Image> */}

      </View>
        <TouchableOpacity onPress={()=>setSideNav(true)} style={styles.menuIcon}>
          {/* Menu Icon */}
          <Icon name="bars" style={{left:10,top:0}} size={30} color="#fff" />

        </TouchableOpacity>
        <View style={styles.profileSection}>


        <Image
      source={
        imageError || !NameBus?.img
          ? require('../assets/UserProfile.png') // Local fallback image
          : { uri: NameBus.img } // Remote image URL
      }
      style={styles.profileImage}
      onError={() => setImageError(true)} // Handle image error
    />



{data && data.data && data.data[0] && data.data[0].img ? (
  <Image
    source={{ uri: data.data[0].img }}
    style={{ height: 60, width: 60, left: 100, top: -2 }}
  />
) : (
  <Image
    source={require("../assets/badgesFree.png")}
    style={{ height: 65, width: 65, left: 100, top: 0 }}
  />
)}

{/* 

          <Image source={{uri:data?.data[0]?.img}} style={{height:40,width:40,left:100,top:0}}>

          </Image> */}
        
          {/* <Text style={styles.profileName}>Mani kanta</Text> */}
          <TouchableOpacity style={styles.notificationIcon}>
            {/* Notification Icon */}
         
          </TouchableOpacity>
        </View>
        </LinearGradient>
        <Icon name="bell" style={{right:16,top:14}} size={30} color="#FFD700" />
      </View>

      <View style={{height:60}}></View>
      {/* Lead Information Section */}
      {Leads&&
      <>
     
      <View style={styles.leadInfo}>
  <View style={{flexDirection: "row"}}>
    <View style={{padding: 10}}>
      <Image source={require("../assets/UserSter.png")} style={{height: 20, width: 20}} />
    </View>

    <View>
      <Text style={styles.leadText}>1 New Lead</Text>
      <Text style={styles.leadTextsub}>Name: {Leads?.full_name || "N/A"}</Text>
      <Text style={styles.leadTextsub}>Mobile: {Leads?.phone || "N/A"}</Text>
      <Text style={styles.leadTextsub}>Email: {Leads?.email || "N/A"}</Text>
    </View>
  </View>

  <View>
    <TouchableOpacity onPress={() => navigation.navigate("LeadsList")}>
      <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.openButton}
      >
        <Text style={styles.buttonText}>OPEN</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
</View>

      <Text onPress={()=>navigation.navigate("LeadsList")} style={{borderWidth:0,paddingHorizontal:40,textAlign:"right"}}>
      View All 
      </Text>
      </>
}


      {/* Buttons Section */}
      <View style={styles.buttonsSection}>

      <LinearGradient
  colors={['#1E8A78', '#26A69A']} // Dark to light colors
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.assignLeadsButtonGradient}
>
  <TouchableOpacity onPress={() => navigation.navigate("LeadsList")} style={styles.assignLeadsButton}>
    <Text style={{ color: "white", fontWeight: "700" }}>ASSIGN LEADS</Text>
    <Text style={{ color: "white", fontWeight: "700" }}>
      {(data?.data?.[0]?.send_leads_count || '0')}
    </Text>
  </TouchableOpacity>
</LinearGradient>

       

        <TouchableOpacity onPress={() => navigation.navigate("LeadsList")} style={styles.todayLeadsButton}>
          <Text style={{color:"white",fontWeight:"700"}}>TODAY LEADS</Text>
          <Text style={{color:"white",fontWeight:"700"}}>{data?.today||'0'}</Text>
        </TouchableOpacity>
      </View>

      {/* Package Information Section */}



     {data&& data.data && data.data[0] && data.data[0].end_date&&<LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.packageInfo}
      >
      


      <View style={{flexDirection:"row",borderWidth:0}}>

      <Image source={require("./../assets/Dashboard/wallet.png")} style={{height:50,width:50}}></Image>
      <View style={{marginTop:15}}>
      <Text style={styles.packageText}>PACKAGE </Text>
      <Text style={styles.packageText2}> EXPIRY DATE</Text>
      
      <View style={{paddingHorizontal:10,flexDirection:"row",borderRadius:2,marginTop:5,  backgroundColor:"#fff",marginHorizontal:20,shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, }}>
    <Text style={{ fontWeight: "700", fontSize: 10, color: "#000" }}>
  {data && data.data && data.data[0] && data.data[0].end_date 
    ? new Date(data.data[0].end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) 
    : "N/A"}
</Text>


<Text style={styles.expDate}>
  {data && data.data && data.data[0] && data.data[0].end_date
    ? new Date(data.data[0].end_date).toLocaleDateString('en-GB', { year: 'numeric' })
    : "N/A"}
</Text>

      </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("Packges")} style={styles.payNowButton}>


<Image source={require('../assets/Playnow.png')} style={{width:100,height:30}}></Image>
         
        <Text></Text>
         
        </TouchableOpacity>

      </View>
      <View style={{flexDirection:"row"}}>
        {/* <Image source={require('./../assets/Dashboard/warring.png')} style={{height:20,width:20,top:5,paddingHorizontal:5}}></Image> */}
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        </View>
        <View style={{flexDirection:"row",borderWidth:0,bottom:10,width:"100%",justifyContent:"flex-end",padding:0,margin:0}}>
        <Text style={{ textAlign: "right", fontWeight: "900", fontSize: 12, color: "#fff" }}>
  {data && data.data && data.data[0] && data.data[0].end_date 
    ? Math.max(0, Math.floor((new Date(data.data[0].end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) 
    : 0}
</Text>


       
        <Text style={{textAlign:"right",fontSize:12,color:"#fff"}}> DAYS LEFT</Text>
        </View>
      


      </LinearGradient>}
     

<View style={{paddingHorizontal:40}}>
<DashboardGrid></DashboardGrid>
</View>
      <LineChartData></LineChartData>



<View style={{height:120}}></View>
      </ScrollView>
      <SideNavbar props={props} setMenu={setSideNav} Sidename={Sidename} bage={!data || !data.data || data.data.length === 0?"free": data.data[0]}></SideNavbar>
      <MenuBar></MenuBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000', // Red color background
    borderBottomRightRadius: 400,
    height:220,
    padding: 20,
    position: 'relative',
    width:220
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  expDate:{
  
    color:"#000",
    fontSize:10
  },
  profileSection: {
    alignItems: 'center',
    
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: '#D3D3D3',
    borderWidth: 8,
    left:95,
    top:25
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  leadInfo: {
    backgroundColor: '#D9D9D9',
   
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection:"row",justifyContent:"space-between"
  },
  leadText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  leadTextsub:{
    fontSize: 8,
    fontWeight: 'bold',
  },
  openButton: {
    backgroundColor: '#D32F2F',
    width:"100%",
    marginTop: 10,
    padding: 2,
    borderRadius: 5,
    paddingHorizontal: 35,
    // Shadow for iOS
    shadowColor: '#000', // Black color for shadow
    shadowOffset: { width: 2, height: 2 }, // Right and bottom shadow
    shadowOpacity: 0.25, // Slightly visible shadow
    shadowRadius: 3.5, // Blurred shadow
    // Shadow for Android
    elevation: 0, // Controls the shadow depth
  },
  
  buttonText: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize:12,borderWidth:0,
    fontFamily:"Poppins-Regular"
  
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    marginHorizontal: 20,
   borderWidth:0,
    paddingTop:0
  },

  assignLeadsButtonGradient: {
    borderRadius: 10,
    elevation: 5, // Optional: for shadow effect
  },
  
  assignLeadsButton: {
    backgroundColor: '#26A69A',
    paddingHorizontal:35,
    
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical:10
    ,elevation:5
    
  },
  todayLeadsButton: {
    backgroundColor: '#FFA726',
    paddingHorizontal:35,
    paddingVertical:10,
    borderRadius: 10,
    alignItems: 'center',
    elevation:5
  },
  leadsCount: {
    color:"#fff",
    fontSize: 20,
    
    fontFamily:"Poppins-regular"
  },
  packageInfo: {
    
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  packageText: {
    color: '#fff',
    fontSize: 13,
    textAlign:"center",
    fontWeight:"900"
  },
  packageText2: {
    color: '#fff',
    fontSize: 13,textAlign:"center"
  },
  progressBar: {
    backgroundColor: '#F5F5F5',
    height: 10,
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
  },
  progress: {
    backgroundColor: '#5afc03',
    height: '100%',
    width: '70%', // Adjust width based on progress
    borderRadius: 5,
  },
  payNowButton: {
   
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default DashboardScreen;
