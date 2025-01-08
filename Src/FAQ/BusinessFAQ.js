import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { Header } from '../Header';
import AlertMessage from '../AlertMessage';
import { useMyContext } from '../MyContext';
import { useRoute } from '@react-navigation/native';

const BusinessFAQ = () => {


  const route = useRoute();
  


  const[name,setname]=useState("");

  useEffect(() => {
    const makeRequest = async () => {
      let data = '';

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/businessapp/?id=10814',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NTIwMTgzLCJpYXQiOjE3MjcwODgxODMsImp0aSI6IjNlZjEzYjRlOGUyYzQzMTk5ZTcwMjc2NjI5NTI5Yjg5IiwidXNlcl9pZCI6NTQzNn0.lGzeih-4hDvRjeuUlgMSX_WDlBeWghhA-C5K7aOyZCQ'
        },
        data: data
      };

      try {
        const response = await axios.request(config);
        console.log("sdsds")
       setname(response.data.data.category);
        
      } catch (error) {
        
      }
    };

    // Make the API request when the component mounts
    makeRequest();
  }, []);



  const [faqData, setFaqData] = useState([]);

  const [faqData2, setFaqData2] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState({});
  const [buttonBgColor, setButtonBgColor] = useState('#961702');

  const { LoginState, updateState } = useMyContext();

  const[modalVisible,setModalVisible]=useState(false)
  useEffect(() => {
    
    fetchFAQData2();
  }, [name]);

  const[text,settext]=useState("")

  const AlertMessageClick=(txt)=>{
    settext(txt)
    setModalVisible(true);
  }
  const fetchFAQData = async () => {
    console.log('https://api.aroundme.co.in/businessapp/Businessfaqview/?category='+name)
    try {
      const response = await axios.get(
        'https://api.aroundme.co.in/businessapp/Businessfaqview/?category='+name,
        {
          headers: {
            Authorization: `${LoginState.Token}`,
          },
        }
      );
      setFaqData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      setLoading(false);
    }
  };



  const fetchFAQData2 = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.aroundme.co.in/businessapp/allbusinessfaq/',
      headers: { 
        'Authorization': `Bearer ${LoginState.Token}`
      }
    };
  
    try {
      const response = await axios.request(config);
      setFaqData2(response.data.data);
      console.log(response.data.data)
      console.log('FAQ data fetched successfully');
      fetchFAQData();
    } catch (error) {
      fetchFAQData();
      console.error('Error fetching FAQ data:', error);
    }
  };

  

  

  const handleCheckBoxChange = (id) => {
    setSelectedIds((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSave = () => {
    // Check if at least one checkbox is selected
    const selectedCount = Object.values(selectedIds).filter((isSelected) => isSelected).length;
    if (selectedCount < 1) {
     
      AlertMessageClick("Please select at least one option.")
      return;
    }
    // Logic to save the selected FAQs or perform any other action
    postFaqData();
    setButtonBgColor('#961702');
  };




  const transformedFaqData = {
    faq: Object.keys(selectedIds)
      .filter(key => faqData[key]) // Filter out the keys with `true` values
      .map(key => parseInt(key)) // Convert the keys to integers
  };

  const postFaqData = async () => {
    const url = 'https://api.aroundme.co.in/businessapp/merchentbusinessfaqcreate/';
    const token =LoginState.Token; // Replace this with your actual Bearer token
    const body = transformedFaqData;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include Bearer token in the Authorization header
        },
        body: JSON.stringify(body), // Convert the body object to JSON string
      });
  
      if (!response.ok) {
        throw new Error('Failed to post data');
      }
  
      const responseData = await response.json();
      fetchFAQData2();
      console.log('Response:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleCheckBoxChange(item.id)} style={styles.checkboxQuestionContainer}>
        <CheckBox
          value={selectedIds[item.id] || false}
          onValueChange={() => handleCheckBoxChange(item.id)}
          tintColors={{ true: '#961702', false: '#ccc' }}
          style={styles.checkbox}
        />
        <Text style={styles.question}>{item.question}</Text>
      </TouchableOpacity>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleCheckBoxChange(item.id)} style={styles.checkboxQuestionContainer}>
       
        <Text style={styles.question}>{item.question}</Text>
      </TouchableOpacity>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
   
    <View style={{ flex: 1,backgroundColor:"#fff" }}>
      <Header Title={"FAQ"} />
     
      <View style={styles.container}>
      <AlertMessage Title={text} modalVisible={modalVisible}  setModalVisible={setModalVisible}></AlertMessage>
      
     
       {faqData2.length==0&& <FlatList
          data={faqData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
       }
        
        {faqData2.length!=0&&  <FlatList
          data={faqData2}
          renderItem={renderItem2}
          keyExtractor={(item) => item.id.toString()}
        />}
      </View>

      {faqData2.length==0&&
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: buttonBgColor }]}
        onPressIn={() => setButtonBgColor('red')}
        onPressOut={() => setButtonBgColor('#961702')}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save FAQ</Text>
      </TouchableOpacity>}

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 10,
  },
  checkboxQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  checkbox: {
    marginRight: 8, // Add space between the checkbox and the question text
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"justify",
    color: '#000', // Adjust color to match your design
  },
  answer: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    textAlign: 'justify',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 120,
    padding: 5,
    backgroundColor: '#961702',
    alignItems: 'center',
    borderRadius: 50,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusinessFAQ;
