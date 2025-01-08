import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const PieChartData = () => {
    const data = [
      {
        name: 'Red',
        population: 10,
        color: 'red',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
      {
        name: 'Blue',
        population: 20,
        color: 'blue',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
      {
        name: 'Green',
        population: 15,
        color: 'green',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
    ];
  
    return (
      <View>
        <PieChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  };
  
  
  

export default PieChartData