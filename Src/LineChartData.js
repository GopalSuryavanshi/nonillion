import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useMyContext } from './MyContext';
import ToggleSwitch from './screens/Dashboard/ToggleSwitch';

// Utility functions to calculate dimensions
const { height, width } = Dimensions.get('window');

const getHeigth = (percent) => (height * percent) / 100;
const getWidth = (percent) => (width * percent) / 100;

// Colors and fonts definitions
const colors = {
  white: '#FFFFFF',
  black: '#000000',
};

const fonts = {
  medium: 'Arial', // Replace with your desired font
};

const LineChartData = () => {

  const { LoginState } = useMyContext()
  const [lineData, setLineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.aroundme.co.in/businessapp/leaddata/',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${LoginState.Token}`,
        },
      };

      try {
        const response = await axios.request(config);
        console.log('Full API response:', response);  // Log the full response to inspect the structure

        // Assuming `response.data` is the root object containing the data array
        if (response.data && Array.isArray(response.data.data)) {
          const data = response.data.data;  // Adjust this path according to the logged response

          // Transform API response to line chart data format
          const formattedData = data.map(item => ({
            value: item.leads,
          }));

          setLineData(formattedData);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('API request error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (lineData.length === 0) {
    return <Text></Text>; // You can customize this fallback UI as needed
  }

  return (
    <View style={{ padding: 0, marginHorizontal: 20 }}>
      <LinearGradient
        colors={['#820101', '#FF0404', '#E90303']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 10,
          paddingVertical: getHeigth(3),
          paddingHorizontal: getWidth(3),
        }}
      >
        <TouchableOpacity style={styles.dropDown}>
          <Text style={styles.DailyText}>Daily V</Text>
        </TouchableOpacity>
        <LineChart
          curved
          initialSpacing={0}
          dataPointsRadius={6}
          maxValue={1000} // Adjust according to your max leads value
          dataPointsColor={colors.white}
          data={lineData}
          noOfSections={4}
          textFontSize={13}
          spacing={40}
          textColor1={colors.white}
          textShiftX={-10}
          textShiftY={-8}
          hideRules
          thickness={0.7}
          showVerticalLines
          yAxisColor={colors.white}
          verticalLinesColor={colors.white}
          xAxisColor="transparent"
          color={colors.white}
          xAxisLabelTexts={lineData.map((_, index) => index + 1)} // Placeholder for x-axis labels
          yAxisLabelTexts={['0', '5', '10', '15', '20', '25']}
          xAxisLabelTextStyle={{
            color: 'white',
            marginTop: getHeigth(0.2),
            marginLeft: getWidth(4),
          }}
          yAxisTextStyle={{
            marginRight: getWidth(1.5),
            color: 'white',
          }}
        />
      </LinearGradient>
      <ToggleSwitch></ToggleSwitch>
    </View>
  );
};

export default LineChartData;

const styles = StyleSheet.create({
  DailyText: {
    fontSize: getHeigth(1.5),
    color: colors.black,
    fontFamily: fonts.medium,
  },
  dropDown: {
    backgroundColor: 'white',
    width: getWidth(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: getHeigth(2),
    marginRight: getWidth(4),
    alignSelf: 'flex-end',
    paddingTop: getHeigth(0.5),
  },
});
