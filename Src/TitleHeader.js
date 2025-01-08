import React from 'react'
import {Text,View} from 'react-native'
const TitleHeader = ({Title}) => {
  return (
    <View style={{marginVertical:20,backgroundColor:'white'}}>

        <Text style={{alignSelf:'center',fontSize:25,fontWeight:900,color:'#961702',}}>{Title}</Text>
    
    </View>
  )
}

export default TitleHeader