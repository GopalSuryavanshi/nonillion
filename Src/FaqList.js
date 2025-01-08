import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,Image ,ScrollView} from 'react-native';
import FaqPop from './FaqPop';
import EditFaQ from './FAQ/EditFaQ';
import DeleteFaQ from './FAQ/DeleteFaQ';



const FaqList = ({index,data,DataTable}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };



  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const UserIcon = './assets/Downarrow.png';

  return (
    <>
    {data.map((item,key)=>(<>
    <View style={{width:"100%", flexDirection:'row', borderWidth:0,justifyContent:'space-between'}}>
    
       
          <Text style={{width:"75%"}}>{item.question}</Text>
          <View style={{borderWidth:0,flexDirection:"row",width:70,height:28}}>
<DeleteFaQ  DataTable={DataTable} id={item.id} Q={item.question} answare={item.answer}></DeleteFaQ>
          <EditFaQ  DataTable={DataTable} ID={item.id} Q={item.question} answare={item.answer}></EditFaQ>
          
      <FaqPop Q={item.question} answare={item.answer} UserIcon={UserIcon} isModalVisible={isModalVisible} setModalVisible={setModalVisible} toggleModal={toggleModal}></FaqPop>
      </View>
    </View>


    
    </>
    ))}
    </>
  );
};

export default FaqList;


