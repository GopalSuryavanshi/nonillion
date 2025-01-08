import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use any icon library or custom icons

const DashboardCategories = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.box, styles.newArrival]}>
        <Icon name="search" size={40} color="#FF7F94" />
        <Text style={styles.text}>New Arrival</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.box, styles.recommended]}>
        <Icon name="star" size={40} color="#60A5FA" />
        <Text style={styles.text}>Recommended</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.box, styles.specialDays]}>
        <Icon name="sparkles" size={40} color="#C084FC" />
        <Text style={styles.text}>Special Days</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.box, styles.category]}>
        <Icon name="th-large" size={40} color="#F59E0B" />
        <Text style={styles.text}>Category</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  box: {
    width: '45%',
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newArrival: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#3B82F6', // Blue border
  },
  recommended: {
    backgroundColor: '#DBEAFE',
  },
  specialDays: {
    backgroundColor: '#E9D5FF',
  },
  category: {
    backgroundColor: '#FEF3C7',
  },
});

export default DashboardCategories;
