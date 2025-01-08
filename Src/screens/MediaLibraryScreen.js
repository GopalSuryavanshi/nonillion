import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import EventIcons from './MediaLibrary/EventIcons';
import DashboardCategories from './MediaLibrary/DashboardCategories';
import EventGrid from './MediaLibrary/EventGrid';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const MediaLibraryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FF0404', '#820101']}
        end={{ x: 0.5, y: 0 }}
        start={{ x: 1, y: 0 }}
        style={{ flex: 1 }}

      >
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
        {/* Gradient Text */}
        <Icon name="arrow-left" size={24} color="#fff" />
        <Text style={{ color: '#fff', padding: 10, fontSize: 18, fontWeight: 'bold' }}>
        Media Library
        </Text>
        <Text style={{ color: '#fff', padding: 10, fontSize: 18, fontWeight: 'bold' }}>
       back
        </Text>

        </View>


        {/* Spacer View */}
        <View style={{ marginLeft: "3%", width: "98%", height: 100 }}></View>

        {/* Main Container */}
       
        <ScrollView 
        
            contentContainerStyle={{ paddingBottom: 20 }} // Padding at the bottom
            style={{ flex: 1,backgroundColor:"#fff",borderTopLeftRadius:100 }} // Ensures ScrollView takes up remaining space
          >

<EventIcons />
            {/* Dashboard Categories */}
            <DashboardCategories />
            
            {/* Event Grid */}
            <EventGrid />
          </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default MediaLibraryScreen;
