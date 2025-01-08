
import React,{useState,useEffect} from 'react'
import {TouchableOpacity, View,Text,StyleSheet,TextInput,ScrollView } from 'react-native'
import { Header } from '../Header'
import { useRoute } from "@react-navigation/native"
import Businesstypes from '../Businesstypes'
import axios from 'axios'
import { useMyContext } from '../MyContext'



const Style = StyleSheet.create({
    Title: {
      color: '#961702',
      fontSize: 18
    },


    inputText: {
      borderWidth: 1, borderRadius: 50, paddingHorizontal: 15, borderColor: '#B3B3B3',
    },
    inputTextError: {
      borderWidth: 1, borderRadius: 50, paddingHorizontal: 15, borderColor: '#961702'
    }
  })

const UpdateService = () => {


    useEffect(() => {
        DataTable();
    },[])

    const route = useRoute()
    const id = route.params?.id

    const item = route.params?.item
    const [ServiceNameError, setServiceNameError] = useState(false);
    const [name, setServiceName] = useState(item.service_name);

    const [valide_for, setvalide_for] = useState("");

    const [dataCategory, setDataCategory] = useState([]);
    const [SelectedValue, setSelectedValue] = useState(item.category_id);
    
  const DataTable = async (TokenSuper) => {

    console.log(config)
    axios(config)
      .then((response) => {
        // Handle the API response here.
        console.log('API Response:', response.data.data);
        setDataCategory(response.data.data)
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
  }

  const handleValueChange = (value) => {
  //  setBusinessTypeError(false)
    setSelectedValue(value);
  };


  const { LoginState, updateState } = useMyContext();
  const [Token, setToken] = useState(LoginState);
  
  const headers = {
    // 'Authorization': 'Bearer '+Token+'',
    'Authorization': 'Bearer ' + Token,
  };

  const config = {
    method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
    url: 'https://api.aroundme.co.in/businessapp/category/',
    headers: headers,
    // Add any other relevant options like data, params, etc.
  };


  const [DataSubCategory, setSubDataCategory] = useState([])
  const config2 = {
    method: 'GET', // Use 'GET', 'POST', 'PUT', or 'DELETE' based on your API.
    url: 'https://api.aroundme.co.in/businessapp/SubCategoryView/',
    headers: headers,
    // Add any other relevant options like data, params, etc.
  };
  const DataTableSubCat = async (TokenSuper) => {

    console.log(config)
    axios(config2)
      .then((response) => {
        // Handle the API response here.
        console.log('API Response:', response.data.data);
        setSubDataCategory(response.data.data)
      })
      .catch((error) => {
        // Handle errors here.
        console.error('API Error:', error);
      });
  }


  return (
   <>
<View style={{flex:1,backgroundColor:'white'}}>
        <Header Title={'Update service'}></Header>

<ScrollView>

       


        <View style={{ margin: 10 }}>
        

          <Text style={Style.Title}>Service Name</Text>
          <View style={ServiceNameError == false ? Style.inputText : Style.inputTextError}>
        
          <TextInput value={name} onChange={()=>setServiceNameError(false)} onChangeText={text => {setServiceName(text);}} placeholder='Service Name' ></TextInput>
       </View>



       
        </View>



        <View style={{ margin: 10 }}>
        

        <Text style={Style.Title}>Category</Text>
        <View style={Style.inputText}>
        <Businesstypes
                options={dataCategory}
                selectedValue={SelectedValue}
               
                onValueChange={handleValueChange}
              />
    
    </View>
     </View>

     <View style={{ margin: 10 }}>
        

        <Text style={Style.Title}> Sub Category</Text>
        <View style={Style.inputText}>
        <Businesstypes
                options={dataCategory}
                selectedValue={SelectedValue}
               
                onValueChange={handleValueChange}
              />
    
    </View>
     </View>


     



      <View style={{ margin: 10 }}>
        

        <Text style={Style.Title}>Valid for (Expiry)</Text>
        <View style={ServiceNameError == false ? Style.inputText : Style.inputTextError}>
      
        <TextInput value={valide_for} onChange={()=>setServiceNameError(false)} onChangeText={text => {setvalide_for(text);}} placeholder='Valid for (Expiry)' ></TextInput>
     </View>



     
      </View>


      <View style={{ margin: 10 }}>
        

        <Text style={Style.Title}>Service Details</Text>
            <View style={ServiceNameError == false ? Style.inputText : Style.inputTextError}>
            <TextInput multiline={true}  value={name} onChange={()=>setServiceNameError(false)} onChangeText={text => {setServiceName(text);}} placeholder='Valid for (Expiry)' ></TextInput>
     </View>



     
      </View>


        <View style={{ margin: 10 }}>
        
<TouchableOpacity style={{alignSelf:'center',}}>         
<Text style={{backgroundColor:'#961702',color:'white',fontWeight:900,fontSize:18,padding:10,borderRadius:20,paddingHorizontal:50}}>Update</Text> 
</TouchableOpacity>
    </View>

    </ScrollView>


    </View>
      

   </> 
  )
}

export default UpdateService