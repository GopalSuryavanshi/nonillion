import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {View,Text,Image, TouchableOpacity} from 'react-native'
const Settingicon = './assets/Backarrow.png'
export const HeaderTop = ({Title}) => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // This function will navigate back to the previous screen
  };

  return (
   <View style={{padding:10,paddingVertical:20 ,flexDirection:'row',top:0,}}>

    <TouchableOpacity onPress={handleGoBack}>
         <Image source={require(Settingicon)} style={{alignSelf:'center'}}></Image>
   </TouchableOpacity>
  <View style={{justifyContent:'center',alignSelf:'center',paddingHorizontal:100}}>
<Text style={{alignSelf:'center',color:'#961702',fontWeight:900,fontSize:20}}> {Title}</Text>
</View>
<TouchableOpacity onPress={handleGoBack}>
         <Image source={require(Settingicon)} style={{alignSelf:'center'}}></Image>
   </TouchableOpacity>
</View>
  )
}
