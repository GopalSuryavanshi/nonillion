import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const SlideBtn = ({Title1,Title2,tab,settab}) => {
  return (
    <View style={{justifyContent:'space-around',flexDirection:'row',borderColor:'#961702' ,borderWidth:1,marginHorizontal:10,borderRadius:40,height:40}}>
         <TouchableOpacity onPress={()=>settab(true)} style={tab==true? {backgroundColor:'#961702',justifyContent:'center',width:'50%',borderRadius:40}:{justifyContent:'center' ,width:'50%'}}>
         <Text style={tab==false?{alignSelf:'center',color:'black'}:{alignSelf:'center',color:'white'}}>{Title1}</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>settab(false)} style={tab==true? {justifyContent:'center' ,width:'50%'}:{backgroundColor:'#961702',justifyContent:'center',width:'50%',borderRadius:40}}>
         <Text style={tab==true?{alignSelf:'center',color:'black'}:{alignSelf:'center',color:'white'}}>{Title2}</Text>
         </TouchableOpacity>
    </View>
  )
}

export default SlideBtn