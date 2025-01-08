import React, { useEffect, useState } from 'react'
import {View,Text,TouchableOpacity,PermissionsAndroid, Button, Alert, StyleSheet} from 'react-native'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import SearchHeader from '../SearchHeader';

import Geocoder from 'react-native-geocoding';


Geocoder.init('AIzaSyBrkwnvzLCc5tyzqp6vu2p-a9ifS6fAXJc');

const Loaction = () => {


const [isLoad,setisLoad]=useState(false);
  const Permission = async () => {
    
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '',
          message:
            ' ' +
            "Allow aroundme  to access this device's location",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };





  

    const getCurrentLocation=()=>{
      Geolocation.getCurrentPosition(
        position=>{
          const{ latitude,longitude}=position.coords;
         // setcurrentLocation({latitude,longitude})
         // console.log(latitude,longitude)
         
         setMarkerCoordinate(position.coords)
         
          getcityname(latitude,longitude)
          setisLoad(true);
        },
       Error=>console.log("ok"),
{enableHighAccuracy:true,timeout:15000,maximumAge:10000}
      )
    }
      

    
const [markerCoordinate, setMarkerCoordinate] = useState({
  latitude: 37.78825,
  longitude: -122.4324,
});

const onMarkerDragEnd = (e) => {
  
  setMarkerCoordinate(e.nativeEvent.coordinate);

  //reverseGeocode(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
  getCurrentLocation();
};

    useEffect(() => {
      Permission();
    }, [])  
    

    


    const[state,setState]=useState({ address: ""});

    const  reverseGeocode = (latitude, longitude) => {
         Geocoder.from(latitude, longitude)
           .then((json) => {
             const addressComponent = json.results[0].formatted_address;
 
             var  value=addressComponent.split(",");
          const   count=value.length;
           const  city=value[count-3];
             setState({ address: city });
             console.log(city)
           })
           .catch((error) => console.warn(error));
       };






       const getcityname = (latitude, longitude) => {
        if (latitude && longitude) {
        
          const apiKey = '5f18c2c2fc6a4a9b944deb4ffb457d4e';
          const apiUrl = 'https://api.geoapify.com/v1/geocode/reverse?lat='+latitude+'&lon='+longitude+'&apiKey='+apiKey;
            axios.get(apiUrl)
              .then(response => {
      
                const cityToFind = response.data.features[0].properties.city;
                const isLocationInArray = CitySet.includes(cityToFind);
      
                if(isLocationInArray == true){
                  localStorage.setItem('city', response.data.features[0].properties.city);
                  handleClose();
                  getFromLocalStorage();
                  setlocresponseAlert("");
      
                }else{
                  setlocresponseAlert("Service is not available at this location")
                }
      
              })
              .catch(error => {
                console.error('Error fetching city name:', error);
              });
          }
      }
 
    
  return (

<>
<SearchHeader></SearchHeader>
    <View style={styles.container}>




   { isLoad==true&& <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerCoordinate.latitude,
          longitude:  markerCoordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
       <Marker
          coordinate={markerCoordinate}
          title="Draggable Marker"
          description="Drag and place me!"
          draggable
          onDragEnd={onMarkerDragEnd}
        />
      
    </MapView>
}
    <View style={{backgroundColor:'white',zIndex:10,borderRadius:20,height:70,borderWidth:1,margin:10}}>
      <Text style={{fontWeight:900,fontSize:22}}>
            {state.address !=null&&state.address}
            
      </Text>
      <Text>
      {JSON.stringify(markerCoordinate)}
      </Text>
    </View>
  </View>
</>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});


export default Loaction