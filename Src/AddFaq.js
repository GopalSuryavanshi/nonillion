import axios from 'axios';
import React, { useState } from 'react';
import {TextInput, View, Text, TouchableOpacity, StyleSheet,Image, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { useMyContext } from './MyContext';
import RichTextEditor from './FAQ/RichTextEditor';

const AddFaq = ({Load,Token}) => {

   
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const [question, setQuestion] = useState("");
  const [answare, setAnsware] = useState("");

const [questionE, setQuestionE] = useState(false);
  const [answareE, setAnswareE] = useState(false);
  


  const { LoginState, updateState } = useMyContext();
  const AccessToken=LoginState ;
  

  const [Msgsuccessfully, setMsgsuccessfully] = useState(false);
  // Replace 'YOUR_API_ENDPOINT' with your API's URL.
const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/Businessfaq/add/';

// Replace 'YOUR_BEARER_TOKEN' with your actual bearer token.


const headers = {
      // 'Authorization': 'Bearer '+Token+'',
    'Authorization': 'Bearer '+Token,
  
  
  
};




const postData ={

  "business_details_id":AccessToken.Busid,
  "question":question,
  "answer":answare
  
  
  
  }



const onsumbit=()=>{



  if(question.length<=3){
    setQuestionE(true)
  
  }else{
    if(answare.length<=3){
      setAnswareE(true)
    }else{
      setAnswareE(false)
  
  
  
  ///call fuction
  
  onsumbitServer();
  setQuestion("");
  setAnsware("")
    }
    setQuestionE(false)
  }
  
    // axios.post(API_ENDPOINT, postData, { headers: headers })
    // .then((response) => {
    //   // Handle the API response here.
    //   console.log('API Response:', response.data);
    // })
    // .catch((error) => {
    //   // Handle errors here.
    //   console.error('API Error:', error);
    // });
  
  
  
  }
  

  const onsumbitServer=async()=>{



      axios.post(API_ENDPOINT, postData, { headers: headers })
      .then((response) => {
        // Handle the API response here.
      
        setMsgsuccessfully(true)

        console.log('API Response:', response.data);
        Load();
        
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
    
    
    
    }
    










  return (
    <View style={styles.container}>

<View style={{position:'absolute',backgroundColor:'#961702',width:60,height:60,bottom:50,right:10,borderRadius:100,justifyContent:'center'}}>
    
<TouchableOpacity onPress={toggleModal}>
<Image source={require('./assets/Iconpluse.png')} style={{alignSelf:'center'}}></Image>
      </TouchableOpacity>

      
    </View>

      
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={{fontWeight:900,color:'#961702',alignSelf:'center'}}>Add FAQ </Text>
        
          <View style={{margin:10}}>
            <Text style={styles.Title}>Question</Text>
            <TextInput onFocus={()=>setMsgsuccessfully(false)} onChangeText={(newText) => {
              setQuestion(newText)
  setQuestionE(false)
  }} value={question} placeholder='Enter Question' style={questionE==true? styles.inputTextE:styles.inputText}></TextInput>
        </View>

        <View style={{margin:10,display:"none"}}>
            <Text style={styles.Title}>Answare</Text>
            <TextInput onFocus={()=>setMsgsuccessfully(false)} onChangeText={(newText) => {
    setAnsware(newText);setAnswareE(false)
  }} value={answare} placeholder='Enter answare' style={answareE==true? styles.inputTextE:styles.inputText}></TextInput>
        </View>


        <RichTextEditor
        setAnsware={setAnsware}
        initialContent="<p>This is initial content</p>"
        placeholder="Start writing here..."
      />


        <View style={{margin:10}}>
            <TouchableOpacity onPress={()=>onsumbit()} >  
            <View style={{backgroundColor:"#961702",borderWidth:1,borderRadius:50,padding:10}}>  
                         <Text style={{color:'white',alignSelf:'center',fontWeight:900,fontSize:15}}>Submit</Text>
                         </View>
            </TouchableOpacity>

           {Msgsuccessfully==true&& <Text style={{fontWeight:500,color:'#961702',alignSelf:'center',marginTop:20}}>Save successfully</Text>
}
        </View>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    Title:{color:'black',
    fontSize:15
    },
  
    inputTextE:{
      borderWidth:2,borderRadius:0,paddingHorizontal:30,borderColor:'#961702'
    },
  
    inputText:{
      borderWidth:2,borderRadius:0,paddingHorizontal:30,borderColor:'#B3B3B3'
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    margin: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default AddFaq;
