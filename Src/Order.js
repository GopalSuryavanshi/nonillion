import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet,ScrollView } from 'react-native'
import { Header } from './Header'
import { Text } from 'react-native-elements'

const Order = ({route}) => {
   const Right = './assets/WhiteRighticon.png'
   const GreenLineV = './assets/GreenLineV.png'
   
   const { data } = route.params;
   const { props } = route.params;
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
   return (
      <>
         <Header Title={data +" Orders"}></Header>
         <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>


{
         items.map((item) => (            <View style={{ backgroundColor: '#F7F7F7', margin: 10, padding: 20, borderRadius: 10 }}>
               <Text>Order ID- OD12354621845100</Text>
               <Text style={{ fontWeight: 800, fontSize: 20, marginVertical: 10 }}>Service for</Text>

               <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={{ fontWeight: 700 }}>Date: Aug 09,2023</Text>
                  <Text style={{ fontWeight: 700 }}>Mobile: 99562XXXXX</Text>
               </View>
               <Text style={{ color: '#961702', fontWeight: 800, marginTop: 20, marginBottom: 40 }}>Reason -</Text>






               <View style={{}}>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ borderWidth: 1, width: 20, height: 20, backgroundColor: 'green', justifyContent: 'center', borderRadius: 50 }}>
                        <Image style={{ alignSelf: 'center', justifyContent: 'center' }} source={require(Right)}></Image>
                     </View>
                     <Text style={{ paddingHorizontal: 20, justifyContent: 'center', alignSelf: 'center' }}>Order Confirmed, Aug 09</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ height: 15, backgroundColor: 'green', width: 1, marginHorizontal: 9 }}></View>
                  </View>






               </View>

               <View style={{}}>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ borderWidth: 1, width: 20, height: 20, backgroundColor: 'green', justifyContent: 'center', borderRadius: 50 }}>
                        <Image style={{ alignSelf: 'center', justifyContent: 'center' }} source={require(Right)}></Image>
                     </View>
                     <Text style={{ paddingHorizontal: 20, justifyContent: 'center', alignSelf: 'center' }}>Ready for delivery, Aug 10</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ height: 15, backgroundColor: 'green', width: 1, marginHorizontal: 9 }}></View>
                  </View>






               </View>

               <View style={{}}>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ borderWidth: 0, width: 20, height: 20, backgroundColor: '#FFAB07', justifyContent: 'center', borderRadius: 50 }}>
                        <Image style={{ alignSelf: 'center', justifyContent: 'center' }} source={require(Right)}></Image>
                     </View>
                     <Text style={{ paddingHorizontal: 20, justifyContent: 'center', alignSelf: 'center' }}>Initiate Cancellation, Aug 10</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ height: 15, backgroundColor: '#FFAB07', width: 1, marginHorizontal: 9 }}></View>
                  </View>






               </View>

               <View style={{}}>

                  <View style={{ flexDirection: 'row' }}>
                     <View style={{ borderWidth: 0, width: 20, height: 20, backgroundColor: '#FFAB07', justifyContent: 'center', borderRadius: 50 }}>
                        <Image style={{ alignSelf: 'center', justifyContent: 'center' }} source={require(Right)}></Image>
                     </View>
                     <Text style={{ paddingHorizontal: 20, justifyContent: 'center', alignSelf: 'center' }}>Cancelled, Aug 10</Text>
                  </View>







               </View>












               <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: "space-between" }}>

                  <TouchableOpacity onPress={() => props.navigation.navigate("OrdersStatus")}>
                     <Text style={{ backgroundColor: '#961702', paddingHorizontal: 10, color: 'white', borderRadius: 15, padding: 5, fontWeight: 800 }}>Update order status</Text>
                  </TouchableOpacity>
                  <Text style={{ color: 'black', fontWeight: 800 }}>View more...</Text>
               </View>

            </View>))}






         </ScrollView>
      </>
   )
}






const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue',
   },
   text: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
   },
});

export default Order