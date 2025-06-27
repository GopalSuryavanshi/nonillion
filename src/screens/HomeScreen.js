// HomeScreen.js

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   ActivityIndicator,
//   Modal,
// } from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import Geolocation from '@react-native-community/geolocation';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {CheckBox} from 'react-native-elements';
// import axios from 'axios';
// import polyline from '@mapbox/polyline';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';

// const GOOGLE_API_KEY = 'AIzaSyCsRqbalwba5lS8wO3-4Wh5ko33kWhrncM';

// const HomeScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [routeCoords, setRouteCoords] = useState([]);
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [useCurrentLocation, setUseCurrentLocation] = useState(false);
//   const [searchLocation, setSearchLocation] = useState(null);
//   const [startCoords, setStartCoords] = useState(null);
//   const [endCoords, setEndCoords] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectingFromMap, setSelectingFromMap] = useState(false);
//   const [pinStep, setPinStep] = useState(null);
//   const [centerCoord, setCenterCoord] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);
//   const mapRef = useRef();

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) getLocation();
//       else Alert.alert('Permission Denied', 'Location permission is required.');
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const getLocation = () => {
//     console.log('clicked');
//     setLoading(true);
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         const coords = {latitude, longitude};
//         setLocation(coords);
//         setStartCoords(coords);
//         setLoading(false);
//       },
//       error => {
//         Alert.alert('Error', error.message);
//         setLoading(false);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const fetchRoute = async (origin, destination) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`,
//       );

//       if (!response.data.routes.length) {
//         Alert.alert('No route found');
//         return;
//       }

//       const points = response.data.routes[0].overview_polyline.points;
//       const coords = polyline.decode(points).map(([lat, lng]) => ({
//         latitude: lat,
//         longitude: lng,
//       }));

//       const leg = response.data.routes[0].legs[0];

//       setRouteCoords(coords);
//       setDistance(leg.distance.text);
//       setDuration(leg.duration.text);

//       if (mapRef.current) {
//         mapRef.current.fitToCoordinates(coords, {
//           edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
//           animated: true,
//         });
//       }

//       // Close modal after route is drawn
//       setIsModalVisible(false);
//       setSelectingFromMap(false);
//       setPinStep(null);
//     } catch (err) {
//       Alert.alert('Error fetching route');
//     }
//   };

//   const handleGetDirections = async () => {
//     if (!endPoint || (!useCurrentLocation && !startPoint)) {
//       return Alert.alert('Please enter both locations');
//     }

//     let origin = '';
//     let originCoords = null;

//     if (useCurrentLocation) {
//       if (!location) {
//         Alert.alert('Please wait, current location is being fetched');
//         return;
//       }
//       origin = `${location.latitude},${location.longitude}`;
//       originCoords = location;
//     } else {
//       origin = startPoint;
//       const [lat, lng] = startPoint.split(',');
//       originCoords = {latitude: parseFloat(lat), longitude: parseFloat(lng)};
//     }

//     const [endLat, endLng] = endPoint.split(',');
//     const destinationCoords = {
//       latitude: parseFloat(endLat),
//       longitude: parseFloat(endLng),
//     };

//     setStartCoords(originCoords);
//     setEndCoords(destinationCoords);
//     setRouteCoords([]);
//     setDistance(null);
//     setDuration(null);
//     setSelectingFromMap(false);

//     await fetchRoute(origin, endPoint);
//   };

//   return (
//   <GestureHandlerRootView style={{flex: 1}}>
//     <KeyboardAvoidingView style={styles.container}>
//       <View style={{flex: 1}}>
//         {/* Distance/Duration Info */}
//         {routeCoords.length > 0 && distance && duration && (
//           <View style={styles.infoContainer}>
//             <Text style={styles.infoText}>Distance: {distance}</Text>
//             <Text style={styles.infoText}>Duration: {duration}</Text>
//           </View>
//         )}

//         {/* Modal */}
//         <Modal visible={isModalVisible} animationType="slide" transparent>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity style={{position:'absolute', right:5, borderWidth:1,borderColor:'#fff', top:5}} onPress={() => setIsModalVisible(false)}>
//               <Entypo name='cross' size={20} color='#000' />
//               </TouchableOpacity>
//               <CheckBox
//                 title="Use Current Location as Starting Point"
//                 checked={useCurrentLocation}
//                 onPress={() => setUseCurrentLocation(!useCurrentLocation)}
//               />
//               {!useCurrentLocation && (
//                 <GooglePlacesAutocomplete
//                   placeholder="Enter Starting Point"
//                   fetchDetails={true}
//                   onPress={(data, details) => {
//                     const {lat, lng} = details.geometry.location;
//                     setStartPoint(`${lat},${lng}`);
//                   }}
//                   query={{key: GOOGLE_API_KEY, language: 'en'}}
//                   styles={{
//                     container: {
//                       flex: 0,
//                       zIndex: 9999,
//                     },
//                     textInputContainer: {
//                       borderTopWidth: 0,
//                       borderBottomWidth: 0,
//                     },
//                     textInput: {
//                       height: 40,
//                       color: '#5d5d5d',
//                       fontSize: 16,
//                       backgroundColor: '#f0f0f0',
//                       borderRadius: 5,
//                       paddingHorizontal: 10,
//                       marginVertical: 5,
//                     },
//                     listView: {
//                       zIndex: 9999,
//                       backgroundColor: 'white',
//                       position: 'absolute',
//                       top: 45,
//                       width: '100%',
//                       elevation: 5,
//                       borderRadius: 5,
//                     },
//                   }}
//                 />
//               )}
//               <GooglePlacesAutocomplete
//                 placeholder="Enter Destination"
//                 fetchDetails={true}
//                 onPress={(data, details) => {
//                   const {lat, lng} = details.geometry.location;
//                   setEndPoint(`${lat},${lng}`);
//                 }}
//                 query={{key: GOOGLE_API_KEY, language: 'en'}}
//                 styles={{
//                   container: {
//                     flex: 0,
//                     zIndex: 9999,
//                   },
//                   textInputContainer: {
//                     borderTopWidth: 0,
//                     borderBottomWidth: 0,
//                   },
//                   textInput: {
//                     height: 40,
//                     color: '#5d5d5d',
//                     fontSize: 16,
//                     backgroundColor: '#f0f0f0',
//                     borderRadius: 5,
//                     paddingHorizontal: 10,
//                     marginVertical: 5,
//                   },
//                   listView: {
//                     zIndex: 9999,
//                     backgroundColor: 'white',
//                     position: 'absolute',
//                     top: 45,
//                     width: '100%',
//                     elevation: 5,
//                     borderRadius: 5,
//                   },
//                 }}
//               />
//               <TouchableOpacity
//                 style={styles.submitBtn}
//                 onPress={() => {
//                   setIsModalVisible(false);
//                   setSelectingFromMap(true);
//                   setPinStep('start');
//                 }}>
//                 <Text style={styles.submitText}>Select From Map</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.submitBtn,
//                   {
//                     backgroundColor:
//                       (!startPoint && !useCurrentLocation) || !endPoint
//                         ? 'gray'
//                         : 'dodgerblue',
//                   },
//                 ]}
//                 onPress={handleGetDirections}
//                 disabled={(!startPoint && !useCurrentLocation) || !endPoint}>
//                 <Text style={styles.submitText}>Get Directions</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => console.log('Go Back')}>
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>

//           <View style={styles.searchContainer}>
//             {!selectingFromMap && (
//               <GooglePlacesAutocomplete
//                 placeholder="Search a place on map"
//                 fetchDetails={true}
//                 onPress={(data, details) => {
//                   const {lat, lng} = details.geometry.location;
//                   const coords = {latitude: lat, longitude: lng};
//                   setSearchLocation(coords);
//                   setLocation(coords);
//                    if (mapRef.current) {
//   mapRef.current.animateToRegion(
//     {
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     },
//     1000, // duration in ms
//   );
// }
//                 }}
//                 query={{key: GOOGLE_API_KEY, language: 'en'}}
//                 styles={{
//                   container: {flex: 1, zIndex: 10},
//                   textInput: {
//                     height: 40,
//                     backgroundColor: '#f0f0f0',
//                     borderRadius: 8,
//                     paddingHorizontal: 12,
//                     fontSize: 16,
//                   },
//                   listView: {
//                     zIndex: 100,
//                     elevation: 10,
//                     backgroundColor: '#fff',
//                     borderRadius: 8,
//                     position: 'absolute',
//                     top: 45,
//                   },
//                 }}
//               />
//             )}
//           </View>
//         </View>

//         {/* Map */}
//         <MapView
//           ref={mapRef}
//           style={{flex: 1}}
//           initialRegion={{
//             latitude: 17.4065,
//             longitude: 78.4772,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//           onRegionChangeComplete={region => {
//             if (selectingFromMap) {
//               setCenterCoord({
//                 latitude: region.latitude,
//                 longitude: region.longitude,
//               });
//             }
//           }}>
//           {location && !selectingFromMap && (
//             <Marker
//               coordinate={location}
//               pinColor="blue"
//               title="My Location"
//             />
//           )}
//           {startCoords && (
//             <Marker
//               coordinate={startCoords}
//               pinColor="green"
//               title="Start Point"
//             />
//           )}
//           {endCoords && (
//             <Marker coordinate={endCoords} pinColor="red" title="End Point" />
//           )}
//           {routeCoords.length > 0 && (
//             <Polyline
//               coordinates={routeCoords}
//               strokeWidth={5}
//               strokeColor="#1E90FF"
//             />
//           )}
//         </MapView>

//         {/* Map Pin for Selection */}
//         {selectingFromMap && (
//           <>
//             <View style={styles.fixedPinContainer}>
//               <MaterialCommunityIcons
//                 name="map-marker"
//                 size={40}
//                 color={pinStep === 'start' ? 'green' : 'red'}
//               />
//             </View>
//             <TouchableOpacity
//               style={[
//                 styles.submitBtn,
//                 {position: 'absolute', bottom: 100, alignSelf: 'center'},
//               ]}
//               onPress={async () => {
//                 if (!centerCoord) return;
//                 const coordStr = `${centerCoord.latitude},${centerCoord.longitude}`;
//                 if (pinStep === 'start') {
//                   setStartPoint(coordStr);
//                   setStartCoords(centerCoord);
//                   setPinStep('end');
//                 } else {
//                   setEndPoint(coordStr);
//                   setEndCoords(centerCoord);
//                   await handleGetDirections(); // ✅ ensure route loads right after
//                 }
//               }}>
//               <Text style={styles.submitText}>
//                 {pinStep === 'start' ? 'Set Start Point' : 'Set End Point'}
//               </Text>
//             </TouchableOpacity>
//           </>
//         )}

//         {/* GPS & Direction Button */}
//         <TouchableOpacity style={styles.gpsBtn} onPress={getLocation}>
//           <MaterialCommunityIcons
//             name="crosshairs-gps"
//             size={30}
//             color="#0065F8"
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.dirBtn}
//           onPress={() => {
//             setIsModalVisible(true);
//             setSearchLocation(null);
//             setLocation(null);
//             setStartPoint(null);
//             setEndPoint(null);
//             setStartCoords(null);
//             setEndCoords(null);
//             setRouteCoords([]);
//             setDistance(null);
//             setDuration(null);
//           }}>
//           <FontAwesome5 name="directions" size={20} color="#fff" />
//         </TouchableOpacity>

//         {loading && (
//           <View style={styles.loader}>
//             <ActivityIndicator size="large" color="dodgerblue" />
//           </View>
//         )}
//       </View>
//     </KeyboardAvoidingView>
//   </GestureHandlerRootView>
// );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   submitBtn: {
//     backgroundColor: 'dodgerblue',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 5,
//     marginTop: 10,
//     zIndex: 1000,
//   },
//   submitText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
//   gpsBtn: {
//     position: 'absolute',
//     bottom: '25%',
//     right: '5%',
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 50,
//     elevation: 5,
//   },
//   dirBtn: {
//     position: 'absolute',
//     bottom: '15%',
//     right: '5%',
//     backgroundColor: '#096B68',
//     padding: 10,
//     borderRadius: 10,
//     elevation: 5,
//     width: '12%',
//     height: '5.5%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loader: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',

//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     zIndex: 10000,
//     maxHeight: '80%',
//     borderWidth:1
//   },
//   fixedPinContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginLeft: -20,
//     marginTop: -40,
//     zIndex: 9999,
//   },
//   infoContainer: {
//     position: 'absolute',
//     bottom: 100,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 10,
//     borderRadius: 8,
//     zIndex: 10,
//   },
//   infoText: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#fff',
//     elevation: 5,
//     zIndex: 10,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },

//   backButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#eaeaea',
//     marginRight: 10,
//   },

//   searchContainer: {
//     flex: 1,
//     zIndex: 10, // High z-index
//     elevation: 10, // For Android
//   },
// });

// export default HomeScreen;

/*   wrking finee  */

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const GOOGLE_API_KEY = 'AIzaSyCsRqbalwba5lS8wO3-4Wh5ko33kWhrncM';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectingFromMap, setSelectingFromMap] = useState(false);
  const [pinStep, setPinStep] = useState(null);
  const [centerCoord, setCenterCoord] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getLocation();
      else Alert.alert('Permission Denied', 'Location permission is required.');
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const coords = {latitude, longitude};
        setLocation(coords);
        setStartCoords(coords);
        setStartPoint(`${latitude},${longitude}`); // Set as start point
        setLoading(false);
      },
      error => {
        Alert.alert('Error', error.message);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`,
      );

      if (!response.data.routes.length) {
        Alert.alert('No route found');
        return;
      }

      const points = response.data.routes[0].overview_polyline.points;
      const coords = polyline.decode(points).map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));

      const leg = response.data.routes[0].legs[0];

      setRouteCoords(coords);
      setDistance(leg.distance.text);
      setDuration(leg.duration.text);

      if (mapRef.current) {
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: true,
        });
      }

      setIsModalVisible(false);
      setSelectingFromMap(false);
      setPinStep(null);
    } catch (err) {
      Alert.alert('Error fetching route');
    }
  };

  const handleGetDirections = async () => {
    if (!endPoint || (!useCurrentLocation && !startPoint)) {
      return Alert.alert('Please enter both locations');
    }

    let origin = '';
    let originCoords = null;

    if (useCurrentLocation) {
      if (!location) {
        getLocation();
        return;
      }
      origin = `${location.latitude},${location.longitude}`;
      originCoords = location;
    } else {
      origin = startPoint;
      const [lat, lng] = startPoint.split(',');
      originCoords = {latitude: parseFloat(lat), longitude: parseFloat(lng)};
    }

    const [endLat, endLng] = endPoint.split(',');
    const destinationCoords = {
      latitude: parseFloat(endLat),
      longitude: parseFloat(endLng),
    };

    setStartCoords(originCoords);
    setEndCoords(destinationCoords);
    setRouteCoords([]);
    setDistance(null);
    setDuration(null);
    setSelectingFromMap(false);
    // isModalVisible(false);

    await fetchRoute(origin, endPoint);
  };

  const handleSearchPress = (data, details) => {
    const {lat, lng} = details.geometry.location;
    const coords = {latitude: lat, longitude: lng};
    setSearchLocation(coords);
    setLocation(coords);
    setStartCoords(coords);
    setStartPoint(`${lat},${lng}`);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{flex: 1}}>
          {/* Distance/Duration Info */}
          {routeCoords.length > 0 && distance && duration && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Distance: {distance}</Text>
              <Text style={styles.infoText}>Duration: {duration}</Text>
            </View>
          )}

          {/* Modal */}
          <Modal visible={isModalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                    top: 5,
                  }}
                  onPress={() => setIsModalVisible(false)}>
                  <Entypo name="cross" size={20} color="#000" />
                </TouchableOpacity>
                <CheckBox
                  title="Use Current Location as Starting Point"
                  checked={useCurrentLocation}
                  onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                />
                {!useCurrentLocation && (
                  <GooglePlacesAutocomplete
                    placeholder="Enter Starting Point"
                    fetchDetails={true}
                    onPress={(data, details) => {
                      const {lat, lng} = details.geometry.location;
                      setStartPoint(`${lat},${lng}`);
                    }}
                    query={{key: GOOGLE_API_KEY, language: 'en'}}
                    styles={{
                      container: {
                        flex: 0,
                        zIndex: 9999,
                      },
                      textInputContainer: {
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                      },
                      textInput: {
                        height: 40,
                        color: '#5d5d5d',
                        fontSize: 16,
                        backgroundColor: '#f0f0f0',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginVertical: 5,
                      },
                      listView: {
                        zIndex: 9999,
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: 45,
                        width: '100%',
                        elevation: 5,
                        borderRadius: 5,
                      },
                    }}
                  />
                )}
                <GooglePlacesAutocomplete
                  placeholder="Enter Destination"
                  fetchDetails={true}
                  onPress={(data, details) => {
                    const {lat, lng} = details.geometry.location;
                    setEndPoint(`${lat},${lng}`);
                  }}
                  query={{key: GOOGLE_API_KEY, language: 'en'}}
                  styles={{
                    container: {
                      flex: 0,
                      zIndex: 9999,
                    },
                    textInputContainer: {
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      height: 40,
                      color: '#5d5d5d',
                      fontSize: 16,
                      backgroundColor: '#f0f0f0',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      marginVertical: 5,
                    },
                    listView: {
                      zIndex: 9999,
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: 45,
                      width: '100%',
                      elevation: 5,
                      borderRadius: 5,
                    },
                  }}
                />
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => {
                    setIsModalVisible(false);
                    setSelectingFromMap(true);
                    setPinStep('start');
                  }}>
                  <Text style={styles.submitText}>Select From Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.submitBtn,
                    {
                      backgroundColor:
                        (!startPoint && !useCurrentLocation) || !endPoint
                          ? 'gray'
                          : 'dodgerblue',
                    },
                  ]}
                  onPress={handleGetDirections}
                  disabled={(!startPoint && !useCurrentLocation) || !endPoint}>
                  <Text style={styles.submitText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => console.log('Go Back')}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
              {!selectingFromMap && (
                <GooglePlacesAutocomplete
                  placeholder="Search a place on map"
                  fetchDetails={true}
                  onPress={(data, details) => {
                    const {lat, lng} = details.geometry.location;
                    const coords = {latitude: lat, longitude: lng};
                    setSearchLocation(coords);
                    setLocation(coords);
                    if (mapRef.current) {
                      mapRef.current.animateToRegion(
                        {
                          latitude: coords.latitude,
                          longitude: coords.longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        },
                        1000, // duration in ms
                      );
                    }
                  }}
                  query={{key: GOOGLE_API_KEY, language: 'en'}}
                  styles={{
                    container: {flex: 1, zIndex: 10},
                    textInput: {
                      height: 40,
                      backgroundColor: '#f0f0f0',
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      fontSize: 16,
                    },
                    listView: {
                      zIndex: 100,
                      elevation: 10,
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      position: 'absolute',
                      top: 45,
                    },
                  }}
                />
              )}
            </View>
          </View> */}

          {routeCoords.length === 0 && (
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => console.log('Go Back')}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <View style={styles.searchContainer}>
                {!selectingFromMap && (
                  <GooglePlacesAutocomplete
                    placeholder="Search a place on map"
                    fetchDetails={true}
                    onPress={handleSearchPress}
                    query={{key: GOOGLE_API_KEY, language: 'en'}}
                    styles={{
                      container: {flex: 1, zIndex: 10},
                      textInput: {
                        height: 40,
                        backgroundColor: '#f0f0f0',
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        fontSize: 16,
                      },
                      listView: {
                        zIndex: 100,
                        elevation: 10,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        position: 'absolute',
                        top: 45,
                      },
                    }}
                  />
                )}
              </View>
            </View>
          )}

          {/* Map */}
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            initialRegion={{
              latitude: 17.4065,
              longitude: 78.4772,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onRegionChangeComplete={region => {
              if (selectingFromMap) {
                setCenterCoord({
                  latitude: region.latitude,
                  longitude: region.longitude,
                });
              }
            }}>
            {location && !selectingFromMap && (
              <Marker
                coordinate={location}
                pinColor="blue"
                title="My Location"
              />
            )}
            {startCoords && (
              <Marker
                coordinate={startCoords}
                pinColor="green"
                title="Start Point"
              />
            )}
            {endCoords && (
              <Marker coordinate={endCoords} pinColor="red" title="End Point" />
            )}
            {routeCoords.length > 0 && (
              <Polyline
                coordinates={routeCoords}
                strokeWidth={5}
                strokeColor="#1E90FF"
              />
            )}
          </MapView>

          {/* Map Pin for Selection */}
          {selectingFromMap && (
            <>
              <View style={styles.fixedPinContainer}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={40}
                  color={pinStep === 'start' ? 'green' : 'red'}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  {position: 'absolute', bottom: 100, alignSelf: 'center'},
                ]}
                onPress={async () => {
                  if (!centerCoord) return;
                  const coordStr = `${centerCoord.latitude},${centerCoord.longitude}`;
                  if (pinStep === 'start') {
                    setStartPoint(coordStr);
                    setStartCoords(centerCoord);
                    setPinStep('end');
                  } else {
                    setEndPoint(coordStr);
                    setEndCoords(centerCoord);
                    await handleGetDirections(); // ✅ ensure route loads right after
                  }
                }}>
                <Text style={styles.submitText}>
                  {pinStep === 'start' ? 'Set Start Point' : 'Set End Point'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* GPS & Direction Button */}
          <TouchableOpacity style={styles.gpsBtn} onPress={getLocation}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={30}
              color="#0065F8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dirBtn}
            onPress={() => {
              setIsModalVisible(true);
              setSearchLocation(null);
              setLocation(null);
              setStartPoint(null);
              setEndPoint(null);
              setStartCoords(null);
              setEndCoords(null);
              setRouteCoords([]);
              setDistance(null);
              setDuration(null);
            }}>
            <FontAwesome5 name="directions" size={20} color="#fff" />
          </TouchableOpacity>

          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="dodgerblue" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  submitBtn: {
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    zIndex: 1000,
  },
  submitText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  gpsBtn: {
    position: 'absolute',
    bottom: '25%',
    right: '5%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  dirBtn: {
    position: 'absolute',
    bottom: '15%',
    right: '5%',
    backgroundColor: '#096B68',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    width: '12%',
    height: '5.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    zIndex: 10000,
    maxHeight: '80%',
    borderWidth: 1,
  },
  fixedPinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
    zIndex: 9999,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  // headerContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   backgroundColor: '#fff',
  //   elevation: 5,
  //   zIndex: 10,
  //   borderBottomWidth: 1,
  //   borderColor: '#eee',
  // },

  // backButton: {
  //   padding: 8,
  //   borderRadius: 8,
  //   backgroundColor: '#eaeaea',
  //   marginRight: 10,
  // },

  // searchContainer: {
  //   flex: 1,
  //   zIndex: 10, // High z-index
  //   elevation: 10, // For Android
  // },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    zIndex: 10,
    elevation: 10,
  },
});

export default HomeScreen;

/*  grok ai */
