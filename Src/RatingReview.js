import React,{useState} from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import ReviewList from './ReviewList';
import StarRating from './StarRationg';
const reviwestar = './assets/Reviewstar.png';

const BrowsIcon = './assets/BrowsIcon.png';
const RatingReview = ({Screen}) => {


const [SwitchButton,setSwitchButton]=useState(true)

    return (
   <View style={{borderWidth:0,marginTop:20}}>
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableOpacity onPress={()=>setSwitchButton(true)}>
                <Text style={SwitchButton? {borderRadius:4,color:'white',backgroundColor:"#961702", borderWidth:1,borderColor:"#961702",paddingHorizontal:15,fontSize:20}:{color:'#961702', borderWidth:1,borderColor:"#961702",paddingHorizontal:15,fontSize:20}}>Write a Review</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>setSwitchButton(false)}>
    <Text style={!SwitchButton? {borderRadius:4,color:'white',backgroundColor:"#961702", borderWidth:1,borderColor:"#961702",paddingHorizontal:15,fontSize:20}:{color:'#961702', borderWidth:1,borderColor:"#961702",paddingHorizontal:15,fontSize:20}}>Ratings/Review</Text>
    </TouchableOpacity>
    </View>


  {SwitchButton==true&&<View style={{borderWidth:0,margin:0}}>


{!Screen&& <View style={{paddingVertical:20}}>
    <Text style={SwitchButton==true? {color:'#961702'}:{color:'black'}}>
    Spa-Center-Body-Massage-Service-in-Virar Spa 
    </Text>
    <Text style={{color:'#961702'}}>
    Ratings & Reviews
    </Text>



    <View style={{flexDirection:'row',paddingVertical:0}}>
    <StarRating></StarRating>
</View>

</View>
}

{Screen&& <View style={{paddingVertical:10}}>
    <Text style={SwitchButton==true? {color:'#961702'}:{color:'black'}}>
    
    </Text>
    <Text style={{color:'#961702',height:0}}>
    
    </Text>



    <View style={{flexDirection:'row',paddingVertical:0}}>
    <StarRating></StarRating>
</View>

</View>
}

<View style={{borderWidth:1,minHeight:150,padding:15,borderRadius:10,borderColor:'#D9D9D9'}}>
    
</View>

<View style={{flexDirection:'row',paddingVertical:20}}>
    <Image source={require(BrowsIcon)}></Image>
    <Text style={{color:'#3A71FF',paddingStart:5}}>Attach photos to this review </Text>
    <Text>(optional)</Text>
</View>


<View style={{flexDirection:'row',paddingVertical:20}}>
<Text style={{margin:10,borderRadius:10,alignSelf:'center',borderColor:'#961702',paddingHorizontal:10,justifyContent:'center',paddingVertical:5,fontWeight:600, color:'#961702',fontSize:20,borderWidth:2}}>
+ Upload images
    </Text>
</View>
<View style={{}}>



    <Text style={{borderRadius:10, backgroundColor:'#961702',alignSelf:'center',justifyContent:'center',paddingVertical:5,fontWeight:600, color:'white',paddingHorizontal:100,fontSize:20,}}>
            Submit Review
    </Text>
</View>


</View>
}
{SwitchButton==false&&<>

<ReviewList></ReviewList>





</>
}

   </View>
  )
}

export default RatingReview