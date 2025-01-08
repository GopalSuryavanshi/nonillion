import React from 'react'
import {View,Text,Image,ScrollView} from 'react-native'
import { Header } from './Header'

const Search = './assets/Pensile.png';
const Orderlist = () => {
    const stringArray = ['Hello', 'World', 'React', 'Native'];

    return (
    <View style={{backgroundColor:'white',flex:1}}>

        <Header Title={"Orders"}></Header>


<ScrollView>
        {stringArray.map((str, index) => (
        
        <View style={{borderWidth:0,margin:10,padding:20,backgroundColor:'#F7F7F7',borderRadius:20}}>
<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Sr No. </Text>
<Text style={{color:'#000000'}}>: 101213101213120</Text>
</View>

<Image source={require(Search)}></Image>
</View>

<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Order ID</Text>
<Text style={{color:'#000000'}}>: 101213101213120</Text>
</View>
<Text style={{color:'#961702'}}>  

956824XXXX

</Text>
</View>


<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Status </Text>
<Text style={{color:'#000000'}}>: </Text>
</View>
<Text style={{color:'#961702'}}>pradeep@gmail.com</Text>
</View>



<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Token No :  </Text>
<Text style={{color:'#000000'}}></Text>
</View>

{/* <Image source={require(Search)}></Image> */}
</View>



<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Service for  </Text>
<Text style={{color:'#000000'}}></Text>
</View>

{/* <Image source={require(Search)}></Image> */}
</View>
<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Order Date </Text>
<Text style={{color:'#000000'}}>: 12/08/2023</Text>
</View>

{/* <Image source={require(Search)}></Image> */}
</View>
<View style={{flexDirection:'row' ,justifyContent:'space-between' ,paddingVertical:5}}>
<View style={{flexDirection:'row' }}>
<Text style={{fontWeight:800,color:'#961702'}}>Expiry Date </Text>
<Text style={{color:'#000000'}}>11/09/2023</Text>
</View>

{/* <Image source={require(Search)}></Image> */}
</View>


<View style={{marginVertical:8,borderWidth:1,borderColor:'#961702',padding:10,borderRadius:15,height:100}}>

    <Text style={{color:'#961702',fontWeight:800}}>Action-</Text>
</View>
            



        </View>
      ))}
</ScrollView>


    </View>
  )
}

export default Orderlist