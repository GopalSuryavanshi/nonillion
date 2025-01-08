import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FooterMenu from '../../FooterMenu'
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SelasHeader from './SelasHeader';


const SelasPenal_Dashboard = () => {
  return (
    <View style={{flex:1,borderWidth:0}}>

<SelasHeader title={"Dashboard"}/>


<View style={styles.card}>
      <IconFontAwesome6 name="person-circle-question" size={24} color="white" style={styles.icon} />
      {/* <IconFontAwesome6 name="person-circle-question" size={24} color="black" /> */}
      <Text style={styles.text}>Total Enquiry</Text>
      <Text style={styles.text}> (100)</Text>
    </View>

    <View style={styles.card}>
      <IconFontAwesome6 name="person-circle-question" size={24} color="white" style={styles.icon} />
      {/* <IconFontAwesome6 name="person-circle-question" size={24} color="black" /> */}
      <Text style={styles.text}>Total Enquiry</Text>
      <Text style={styles.text}> (100)</Text>
    </View>


    <View style={styles.card}>
      <IconFontAwesome6 name="person-circle-question" size={24} color="white" style={styles.icon} />
      {/* <IconFontAwesome6 name="person-circle-question" size={24} color="black" /> */}
      <Text style={styles.text}>Total Facebook Leads</Text>
      <Text style={styles.text}> (100)</Text>
    </View>

        <FooterMenu></FooterMenu>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'blue',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  },
  text: {
    color: 'white',
    fontSize: 18
  }
});



export default SelasPenal_Dashboard