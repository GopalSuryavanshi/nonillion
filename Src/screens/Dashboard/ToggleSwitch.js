import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ToggleSwitch = () => {
  const [isTotalUpdates, setIsTotalUpdates] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    setIsTotalUpdates(!isTotalUpdates);
    Animated.timing(translateX, {
      toValue: isTotalUpdates ? 28 : 0, // Adjust this value based on the width of your switch
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.activeLabel, isTotalUpdates ? styles.activeLabel : null]}>
        Total Updates
      </Text>
      <TouchableOpacity onPress={handleToggle} style={styles.switchContainer}>
        <Animated.View
          style={[
            styles.circleContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {isTotalUpdates ? (
            <LinearGradient
              colors={['#FF0404', '#820101']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.circle}
            />
          ) : (
            <View style={[styles.circle, { backgroundColor: 'gray' }]} />
          )}
        </Animated.View>
      </TouchableOpacity>
     

     
      <Text style={[styles.label, !isTotalUpdates ? styles.inactiveLabel : null]}>
        Total Leads
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#961702', // Only "Total Updates" turns red when active
  },
  inactiveLabel: {
    color: 'black', // "Total Leads" stays black regardless of the state
  },
  switchContainer: {
    borderWidth:0,
    width: 50, // Adjust width based on design
    height: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  circleContainer: {
    width: 20, // Adjust size based on the width of your switch
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});

export default ToggleSwitch;
