import React from 'react';
import {View, Text,StyleSheet,ScrollView} from 'react-native';
import {Header} from './Header';


const style=StyleSheet.create({

})
const Appointments = () => {
  const data=[ { id: 1, name: 'Item 1' },
  {id:2,name:'Item 2'},
  {id:3,name:'Item 3'},
  {id:4,name:'Item 4'},
  {id:5,name:'Item 5'},
  {id:6,name:'Item 6'}
  
]
  return (
    <View style={{backgroundColor:'white',flex:1}}>
      <Header Title={'Appointments'}></Header>
      <ScrollView>
      {data.map((item) => (
      <View style={{padding: 10,margin:2,borderRadius:10,backgroundcolor:'#F7F7F7'}}>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color:'#7C7C7C'}}>Sr No. - {item.name}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Appointment ID</Text>
          <Text style={{color:'#961702'}}>Pradeep khaitan</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>12 October, 2023</Text>
          <Text style={{color:'#961702'}} >956824XXXX</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text></Text>
          <Text style={{color:'#961702'}}>pradeep@gmail.com</Text>
        </View>






        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Action</Text>
         
        </View>


        <View >
          <View  style={{height:100, borderWidth:1,borderColor:'#961702',backgroundColor:'white',borderRadius:20}}>
            <Text style={{backgroundColor:'White'}}></Text>
          </View>
         
        </View>



      </View>))}
      </ScrollView>
    </View>
  );
};




export default Appointments;
