import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {View,Text,Image, TouchableOpacity} from 'react-native'
const Settingicon = './assets/Backarrow.png'
export const Header = ({Title}) => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // This function will navigate back to the previous screen
  };




  return (
   <View style={{borderWidth:0.1,borderColor:'#0000004D',justifyContent:'space-between', padding:10,paddingTop:15 ,flexDirection:'row',top:0,backgroundColor:'white',...Platform.select({
    android: {
      elevation: 3, // Android shadow
    }})
    
    
    }}>

    <TouchableOpacity onPress={handleGoBack}>
         <Image source={require(Settingicon)} style={{alignSelf:'center',marginTop:4}}></Image>
   </TouchableOpacity>
  
<Text style={{color:'#961702',fontWeight:900,fontSize:20}}> {Title}</Text>



<Text> </Text>

</View>
  )
}
