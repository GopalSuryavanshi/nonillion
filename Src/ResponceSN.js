import React from 'react'
import { View, Text ,Image} from 'react-native';
import Btn from './btn';


export const ResponceSN = (props) => {
    const IconSuccess = './assets/Success.png'
  return (
    <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
      
        }}>
        <Text style={{
  fontSize: 30,
  color: '#850101',
  fontWeight: '700',
  paddingVertical: 20,
  fontFamily:'Poppins-Regular'}}>Password Updated</Text>
        <Image style={{paddingVertical:30}} source={require(IconSuccess)}></Image>
        <Text  style={{textAlign:'center',
fontSize:15,
color:'black',
fontWeight:'400',
width:"80%",
marginTop:20
,
fontFamily:'Poppins-Regular' ,marginBottom:30}}>Your password has been updated</Text>
        <Btn textColor={"white"}  bgColor={'#961702'} btnLabel={'Login'} props={props} screenName={'Home'}></Btn>
    </View>
  )
}


