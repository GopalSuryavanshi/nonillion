import React,{useState} from 'react'
import { View,Text,TouchableOpacity,TextInput,Image } from 'react-native'
import ConfirmAlert from './ConfirmAlert'
import AlertMessage from '../AlertMessage'
import FullScreenDataLoader from './FullScreenDataLoader'
import FileUploadComponent from '../FileUploadComponent'
import { launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios'

const Tools = () => {





   
    
















    const[AlertTool,setAlerTool]=useState();
    const onchage= ()=>{
        setAlerTool(true)
    }

const[Onclick,setOnclick]=useState(false)

const loadLoade=()=>{
    setOnclick(true)
}


const options={
    
        title: 'Take Image',
        type: 'capture',
        options: {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: false,
         
        },
      
}




const[type,setType]=useState();
const[uri,setUri]=useState();
const [fileName,setFilename]=useState();

const OpenGallray=async()=>{
    const result = await launchImageLibrary(options);
    console.log(result);
   
    setType(result.assets[0].type)
    setUri(result.assets[0].uri)
    setFilename(result.assets[0].fileName)

   
}








    return (
    <View style={{backgroundColor:'pink',flex:1}}>
<Text style={{fontWeight:900,fontSize:22,color:'black',alignSelf:'center'}}>Around me Android Tools</Text>

<Text style={{fontWeight:900,fontSize:18,color:'black',alignSelf:'center'}}>Testing Zone</Text>
<View style={{width:500,height:10,backgroundColor:'red'}}></View>
        <ConfirmAlert Message={"This is test Confim message"}  Title={"Alert Title"}></ConfirmAlert>
<AlertMessage Title={"Test Message"} modalVisible={AlertTool}  setModalVisible={setAlerTool}></AlertMessage>



<View style={{backgroundColor:'white',marginVertical:10}}>
        <Text style={{color:'black',padding:10}}>Button</Text>
       <View style={{flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity>
            <Text style={{backgroundColor:'white',margin:5, borderRadius:50,paddingHorizontal:10,color:'#961702',borderWidth:2,borderColor:'#961702',justifyContent:'center',alignSelf:'center',padding:3,fontWeight:800}}>Click Button </Text>
        </TouchableOpacity>

<TouchableOpacity onPress={()=>loadLoade()}>
    <Text style={{backgroundColor:'white',margin:5, borderRadius:50,paddingHorizontal:10,color:'#961702',borderWidth:2,borderColor:'#961702',justifyContent:'center',alignSelf:'center',padding:3,fontWeight:800}}>Full Screen Loader</Text>
</TouchableOpacity>
<FullScreenDataLoader visible={Onclick} color={'#961702'}></FullScreenDataLoader>


        <TouchableOpacity>
            <Text style={{backgroundColor:'#961702',margin:5, borderRadius:50,paddingHorizontal:10,color:'white',borderWidth:2,borderColor:'#961702',justifyContent:'center',alignSelf:'center',padding:3,fontWeight:800}}>Active button</Text>
        </TouchableOpacity>
       </View>
</View>
<Text>FileName : {fileName}</Text>

<Text>Uri :  {uri}</Text>

<Text>type : {type}</Text>


<Image style={{height:100,width:100,borderWidth:1}} source={{uri:uri}}></Image>

<View style={{backgroundColor:'white'}}>
        <Text style={{color:'black',padding:10}}>TextInput</Text>
        <TextInput style={{borderWidth:2,margin:10,borderRadius:50,backgroundColor:'white'}}></TextInput>
        <TextInput placeholder='Error' style={{paddingHorizontal:30,borderWidth:2,margin:10,borderRadius:50,backgroundColor:'white',borderColor:'#961702'}}></TextInput>
</View>

<FileUploadComponent></FileUploadComponent>



<TouchableOpacity onPress={()=>OpenGallray()}> 
<Text style={{color:'white'}}>Alert Popup</Text>
</TouchableOpacity>



<TouchableOpacity onPress={()=>submitbtn()}> 
        <Text style={{color:'white'}}>okk uploading</Text>
</TouchableOpacity>




<TouchableOpacity  onPress={()=>onchage()} style={{backgroundColor:'red',margin:10,alignSelf:'center',padding:10}}> 
        <Text style={{color:'white'}}>Alert Popup</Text>
</TouchableOpacity>
    </View>



  )
}

export default Tools