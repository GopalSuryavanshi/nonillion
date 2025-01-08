import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from './Header';
import FaqList from './FaqList';
import AddFaq from './AddFaq';
import axios from 'axios';
import { useMyContext } from './MyContext';
import FullScreenDataLoader from './System/FullScreenDataLoader';

const Faq = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { LoginState } = useMyContext();
  const API_ENDPOINT = 'https://api.aroundme.co.in/businessapp/Businessfaqview/?id=' + LoginState.Busid;

  const headers = {
    'Authorization': 'Bearer ' + LoginState.Token,
  };

  const config = {
    method: 'GET',
    url: API_ENDPOINT,
    headers: headers,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    DataTable();
  }, []);

  const DataTable = async () => {
    setLoader(true);
    setError(false);
    axios(config)
      .then((response) => {
        setData(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setError(true);
        console.error('API Error:', error);
      });
  };

  return (
    <>
      <Header Title={"FAQ"} />
      {loader && <FullScreenDataLoader color={"#961702"} />}
      <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
        <ScrollView>
          {error ? (
            <Text>Click the plus button to add questions and answers related to your business</Text>
          ) : (
            <FaqList DataTable={DataTable} data={data} index={1} />
          )}
        </ScrollView>
        <AddFaq Load={DataTable} Token={LoginState.Token} />
      </View>
    </>
  );
};

export default Faq;
