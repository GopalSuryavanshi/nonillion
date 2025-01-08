import React from 'react'
import { Image, Text, View,TouchableOpacity } from 'react-native'

const HomeiconActive = './assets/Activeicon/Home.png'
const BaliconActive = './assets/Activeicon/Ball.png'


const SettingiconActive = './assets/Activeicon/Setting.png'



const Homeicon = './assets/Homeicon.png'
const ProfileLogoActive = './assets/Activeicon/Profile.png'

const Balicon = './assets/Balicon.png'

const ProfileLogo = './assets/ProfileLogo.png'

const Settingicon = './assets/settingLogo.png'
export const Footer = ({props,title}) => {

        
  return (
    <View style={{flex:1 ,flexDirection:'row' ,justifyContent:'space-around',alignSelf:'center',position:'absolute',height:70,    width:'100%',bottom:0, borderWidth:0,backgroundColor:'white'}}>
        
     {title=="Home" &&  <View style={title=="Home"? {paddingVertical:6,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:6,borderTopWidth:0}}>
        <View style={{backgroundColor:'#961702',height:55,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
<TouchableOpacity onPress={()=>props.navigation.navigate("Dashboard")}>
<Image source={require(HomeiconActive)} style={{alignSelf:'center',justifyContent:'center'}}></Image>
</TouchableOpacity>
</View>
        </View>}

        {title!="Home" &&  <View style={title=="Home"? {paddingVertical:6,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:6,borderTopWidth:0}}>
        <View style={{height:55,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
<TouchableOpacity onPress={()=>props.navigation.navigate("Dashboard")}>
<Image source={require(Homeicon)} style={{alignSelf:'center',justifyContent:'center'}}></Image>
</TouchableOpacity>
</View>
        </View>}





        {/* <View style={{backgroundColor:'#961702', width:55,height:55, padding:10,borderRadius:100}}> */}
{/* <View style={{backfaceVisibility:'#961702'}}></View> */}
        
       { title=="Service"&&  <View style={title=="Service"? {paddingVertical:0,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:6,borderTopWidth:0}}>
      

        <View style={{borderTopWidth:0,height:70,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
        <View style={{backgroundColor:'#961702', width:55,height:55, padding:10,borderRadius:100}}>
        <TouchableOpacity onPress={()=>props.navigation.navigate("ServicesandPrice")}>
<Image source={require(SettingiconActive)} style={{alignSelf:'center'}}></Image>

</TouchableOpacity>
</View>

        </View>
        </View>}


      {title!="Service"&&  <View style={title=="Service"? {paddingVertical:6,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:0,borderTopWidth:0}}>
      
      <View style={{borderTopWidth:0,height:70,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("ServicesandPrice")}>
<Image source={require(Settingicon)} style={{alignSelf:'center'}}></Image>

</TouchableOpacity>
      </View>
      </View>}








      { title=="Notification"&& <View style={title=="Notification"? {paddingVertical:0,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:6,borderTopWidth:0}}>
      
        <View style={{borderTopWidth:0,height:70,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
       <View style={{backgroundColor:'#961702', width:55,height:55, padding:10,borderRadius:100}}>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Notification")}>
<Image source={require(BaliconActive)}  style={{alignSelf:'center'}}></Image>
</TouchableOpacity>
</View>
        </View>
</View>}


{ title!="Notification"&&
<View style={title=="Notification"? {borderWidth:0, paddingVertical:0,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:0,borderTopWidth:0}}>
      
        <View style={{borderTopWidth:0,height:70,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Notification")}>
<Image source={require(Balicon)}  style={{alignSelf:'center'}}></Image>
</TouchableOpacity>
        </View>
</View>
}



















<View style={title=="Profile"? {paddingVertical:0,borderTopWidth:2,borderColor:'#961702'}:{paddingVertical:0,borderTopWidth:0}}>
      
{title=="Profile"&&  <View style={title=="Profile"? {borderColor:'#961702',  height:70,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}:{ height:70,width:55,borderRadius:100,padding:2,alignSelf:'center',justifyContent:'center'}}>
        <TouchableOpacity style={{backgroundColor:'#961702',borderRadius:100,height:55,width:55,justifyContent:'center'}} onPress={()=>props.navigation.navigate("UserProfile")}>
<Image source={require(ProfileLogoActive)} style={{alignSelf:'center'}}></Image>
</TouchableOpacity>
</View>}






{title!="Profile"&&  <TouchableOpacity style={{paddingTop:10,borderRadius:100,height:55,width:55,justifyContent:'center'}} onPress={()=>props.navigation.navigate("UserProfile")}>
<Image source={require(ProfileLogo)} style={{alignSelf:'center'}}></Image>
</TouchableOpacity>}



        </View>
    </View>
  )
}
