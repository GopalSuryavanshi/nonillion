import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import MyCarousel from './MyCarousel';
// import { launchImageLibrary} from 'react-native-image-picker';



// const Pluse = './assets/Iconpluse.png'


const Businessgallery = ({props}) => {
  const data = [
    { title: 'Item 1', image: 'image1.jpg' },
    { title: 'Item 2', image: 'image2.jpg' },
    // Add more items as needed
  ];



  
  return (
    <View style={{flex:1,justifyContent:'center',position:'relative',alignSelf:'center',height:380}}>
      

        <View style={{height:300,borderWidth:0}}>
<Text>ddfd</Text>
       <MyCarousel></MyCarousel>
        </View>


<TouchableOpacity onPress={() => props.navigation.navigate("UploadImg")}>
      <View  style={{backgroundColor:'#961702',borderRadius:100,padding:10,width:50,alignSelf:'center'}}>
      <Image  style={{}} source={require(Pluse)}></Image>
      </View>
      </TouchableOpacity>
       
       
    </View>
  )
}

export default Businessgallery