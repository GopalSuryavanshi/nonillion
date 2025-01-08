import React from 'react'
import { Text, View } from 'react-native'
import FooterMenu from '../../FooterMenu'
import SelasHeader from './SelasHeader'


const SelasPenal_facebook = () => {
  return (
    <View style={{flex:1,borderWidth:0}}>
      <SelasHeader title={"Facebook leads"}></SelasHeader>
<Text>SelasPenal_facebook</Text>
        <FooterMenu title={"facebook"}></FooterMenu>
    </View>
  )
}

export default SelasPenal_facebook 