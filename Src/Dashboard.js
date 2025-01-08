import React, { useState,useEffect } from 'react'
import  {Text, Image, TextInput, TouchableOpacity, ScrollView,View } from 'react-native'

import SideNavbar from './SideNavbar';


import axios from 'axios';
import PieChartData from './PieChart';
import { CommonActions, useNavigation } from '@react-navigation/native';
import SubscriptionCard from './SubscriptionCard';
import { useMyContext } from './MyContext';
import SubscriptionCardWithData from './SubscriptionCardWithData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Nofication } from './systm/Nofication';
// import GameBoard from './Game/GameBoard';



const Dashboard = (props) => {
  const { LoginState ,updateState} = useMyContext();
  const AccessToken = LoginState;

  
  const Hamburger = './assets/Hamburger.png';
  const Bookpen = './assets/Bookpen.png';
  const Logo = './assets/Logo.png';

  const Search = './assets/Search.png';
  const Newbusiness = './assets/Newbusiness.png';

  const navigation = useNavigation();
  const[Sidename,setSideNav]=useState(false)

 useEffect(() => {
  GetBusinessData()
 }, [])
 





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
         props.navigation.navigate("UserProfile");
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



const[NameBus,setNameBus]=useState();

const OwnerABC = () => {
  axios
    .get('https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=' + LoginState.Mid, {
      headers: {
        Authorization: `Bearer ${LoginState.Token}`,
      },
    })
    .then((response) => {
      const data = response.data.data;
      
      setNameBus(data.name)
     
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
    <>
    <Nofication></Nofication>
      <View style={{ backgroundColor: 'white', flex: 1 ,padding:0}}>



          



        <View style={{ backgroundColor: 'white', padding: 20, height: 70, flexDirection: 'row', justifyContent: "space-between" }}>

          <View style={{ alignSelf: 'center' }}>
            <TouchableOpacity onPress={()=>setSideNav(true)} >
              <Image source={require(Hamburger)}>
              </Image>
            </TouchableOpacity>
          </View>


          <View>
           <Text style={{ maxWidth: 250,fontSize:22,fontWeight:900,color:'#961702'}}  numberOfLines={1}
        ellipsizeMode="tail">Welcome  to {NameBus}</Text>
          </View>

          <View style={{ alignSelf: 'center' }}>
        
          {/* <Image source={require(Bookpen)}></Image> */}
           
          </View>


        </View>
        {/* search   */}

   

          <ScrollView style={{flex:1,alignSelf:'center',borderWidth:0,width:"100%",padding:5,paddingHorizontal:20}}>

          {/* <TouchableOpacity onPress={()=>props.navigation.navigate("Inquiry")}>
          <View style={{backgroundColor:'#CFF4FC',height:90,width:"100%",borderRadius:10,position:'relative',marginVertical:10}}>
          <View style={{backgroundColor:'#0DCAF0',height:90,width:"82%",borderRadius:10,justifyContent:'center',opacity:1}}>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}>Total Enquiries</Text>
</View></View>
</TouchableOpacity> */}

{/* <TouchableOpacity onPress={()=>props.navigation.navigate("LeadsList", { data: 'Padding ',props:props })}>
<View style={{backgroundColor:'#FFF3CD',height:90,width:"100%",borderRadius:10,position:'relative',marginVertical:10}}>
          <View style={{backgroundColor:'#FFC107',height:90,width:"82%",borderRadius:10,justifyContent:'center',opacity:1}}>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}>Total Leads</Text>
</View></View>
</TouchableOpacity> */}

<TouchableOpacity onPress={()=>props.navigation.navigate("LeadsList", { data: 'Completed ',props:props  })}>
<View style={{backgroundColor:'#D1E7DD',height:90,width:"100%",borderRadius:10,position:'relative',marginVertical:10}}>
          <View style={{backgroundColor:'#198754',height:90,width:"82%",borderRadius:10,justifyContent:'center',opacity:1}}>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}>Assigned lead</Text>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}> {(data?.data?.[0]?.send_leads_count || '0')}</Text>
</View></View>
</TouchableOpacity>


<TouchableOpacity onPress={()=>props.navigation.navigate("LeadsList", { data: 'Cancelled',props:props  })}>
<View style={{backgroundColor:'#CFE2FF',height:90,width:"100%",borderRadius:10,position:'relative',marginVertical:10}}>
          <View style={{backgroundColor:'#0D6EFD',height:90,width:"82%",borderRadius:10,justifyContent:'center',opacity:1}}>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}>Today lead</Text>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}> {data?.today}</Text>
</View></View>
</TouchableOpacity>

{/* 
<TouchableOpacity onPress={()=>props.navigation.navigate('Orders')}>
<View style={{backgroundColor:'#CFE2FF',height:90,width:"100%",borderRadius:10,position:'relative',marginVertical:10}}>
          <View style={{backgroundColor:'#0D6EFD',height:90,width:"82%",borderRadius:10,justifyContent:'center',opacity:1}}>
<Text style={{color:'white',fontSize:20,alignSelf:'center',justifyContent:'center'}}>Total Orders</Text>
</View></View>

</TouchableOpacity> */}




{/* <View style={{marginVertical:50}}><Text style={{alignSelf:'center',justifyContent:'center' ,fontWeight:900,fontSize:22,color:'#0D6EFD',}}>Total Order Details</Text></View> */}


<View>
{!data || !data.data || data.data.length === 0?<SubscriptionCard/>:<SubscriptionCardWithData packageData={data.data[0]}></SubscriptionCardWithData>}



  {/* <PieChartData></PieChartData> */}
</View>


{/* <GameBoard></GameBoard> */}
          </ScrollView>





      </View>


      <View>


        
      </View>

      <SideNavbar props={props} setMenu={setSideNav} Sidename={Sidename} bage={!data || !data.data || data.data.length === 0?"free": data.data[0]}></SideNavbar>
   
    </>
  )
}

export default Dashboard