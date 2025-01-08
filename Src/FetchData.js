import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const FetchData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/businessapp/?id=557',
        headers: { 
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MTQxMzQ1LCJpYXQiOjE3MTUwNTQ5NDUsImp0aSI6IjAxMDY0MDE5MzhlZDQyZGU5M2M1NDE1ODZiNGY0MjM2IiwidXNlcl9pZCI6OTkxfQ.yhjVlTkJa6sk0tAFd5ZNX3GsIdHRmxlzSupb7mo-kCY'
        }
      };

      try {
        const response = await axios.request(config);
        setData(response.data.data);  // Store the response data in state
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);  // Store the error in state
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {error ? (
        <Text>Error fetching data</Text>
      ) : (
        data ? (
          <Text>Data fetched successfully: {JSON.stringify(data)}</Text>
        ) : (
          <Text>Loading...</Text>
        )
      )}
    </View>
  );
};

export default FetchData;
