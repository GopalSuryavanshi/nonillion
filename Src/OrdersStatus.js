import React from 'react'
import {View,Text,Image} from 'react-native'
import { Header } from './Header'
import Switchbtn from './Switchbtn'

const Right = './assets/WhiteRighticon.png'
const GreenLine = './assets/GreenLine.png'
const OrdersStatus = () => {
  return (
    <>    
     <Header Title={"Orders Status"}></Header>
    <View style={{flex:1,borderWidth:0,backgroundColor:'white'}}>
     


      <View style={{padding:15}}>
   <View style={{flexDirection:'row',justifyContent:'space-evenly',alignSelf:'center',paddingVertical:20}}>
    
    <View style={{backgroundColor:'#198754',padding:8,borderRadius:20}}>
    <Image style={{height:20,width:20}} source={require(Right)}></Image>
    </View>
    
    <View  style={{justifyContent:'center',alignSelf:'center',backgroundColor:'#198754',height:4,width:60}} ></View>
   
    <View style={{backgroundColor:'#198754',padding:8,borderRadius:20}}>
    <Image style={{height:20,width:20}} source={require(Right)}></Image>
    </View>
   <View  style={{justifyContent:'center',alignSelf:'center',backgroundColor:'#198754',height:4,width:60}} ></View>
    <View style={{backgroundColor:'#198754',padding:8,borderRadius:20}}>
    <Image style={{height:20,width:20}} source={require(Right)}></Image>
    </View>
   <View  style={{justifyContent:'center',alignSelf:'center',backgroundColor:'#198754',height:4,width:60}} ></View>
    <View style={{backgroundColor:'#198754',padding:8,borderRadius:20}}>
    <Image style={{height:20,width:20}} source={require(Right)}></Image>
    </View>
   </View>





 



<View style={{flexDirection:'row' ,justifyContent:'space-between',padding:10}}>
   <View style={{flexDirection:'row'}}>
    <Text style={{fontWeight:900,color:'#961702'}}>Order ID </Text>
   <Text style={{color:'black',fontWeight:600}}>OD12354621845100</Text>
   </View>

   <View style={{flexDirection:'column'}}>
   <Text>  </Text>
   
   </View>

   </View>
   



   
   <View style={{flexDirection:'row' ,justifyContent:'space-between',padding:10}}>
   <View style={{flexDirection:'column'}}>
    <Text style={{color:'black',fontWeight:600}}>Order Confirmed</Text>
   
   </View>

   <View style={{flexDirection:'column'}}>
   
   <Switchbtn></Switchbtn>
   
   </View>

   </View>





   <View style={{flexDirection:'row' ,justifyContent:'space-between',padding:10}}>
   <View style={{flexDirection:'column'}}>
    <Text style={{color:'black',fontWeight:600}}>Order Shipped</Text>
   
   </View>

   <View style={{flexDirection:'column'}}>
   <Switchbtn></Switchbtn>
   
   </View>

   </View>



















   <View style={{flexDirection:'row' ,justifyContent:'space-between',padding:10}}>
   <View style={{flexDirection:'column'}}>
    <Text style={{color:'black',fontWeight:600}}>Order In Route</Text>
   
   </View>

   <View style={{flexDirection:'column'}}>
   <Switchbtn></Switchbtn>
   
   </View>

   </View>










   <View style={{flexDirection:'row' ,justifyContent:'space-between',padding:10}}>
   <View style={{flexDirection:'column'}}>
    <Text style={{color:'black',fontWeight:600}}>Order Delivered</Text>
   
   </View>

   <View style={{flexDirection:'column'}}>
   <Switchbtn></Switchbtn>
   </View>

   </View>
   </View>





   <View >
    <Text style={{marginHorizontal:15,padding:5,color:'#961702'}}>Cancellation Reason</Text>

    <View style={{borderWidth:1,height:200,marginHorizontal:15,borderRadius:10,padding:5,borderColor:'#B3B3B3'}}>
      <Text></Text>
    </View>
   </View>
    </View>
    </>
  )
}

export default OrdersStatus