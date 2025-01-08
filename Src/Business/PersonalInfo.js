import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PersonalInfo = ({data}) => {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
     
     <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.title}>Personal Info:</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{flexDirection:'row',backgroundColor:"#961702",justifyContent:"center",width:70,padding:5,margin:5,borderRadius:50}}>
      {/* <Icon name="edit" size={20} style={{fontWeight:900,paddingTop:0}} color="#fff" /> */}
      <Text style={{color:"#fff",fontSize:10,textAlign:"center",fontWeight:900}}>Edit</Text>
      </TouchableOpacity>
      
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>UserName</Text>
            <Text style={styles.value}>{data.user}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{data.name}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.value}>{data.mobile_no}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email_optional}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Whatapp</Text>
            <Text style={styles.value}>{data.whatsapp_no}</Text>
          </View>
          {/* <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email_optional}</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:400,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
     color:"#961702"
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
   color:"#808080"
  },
  value: {
    fontSize: 14,
    textTransform:"capitalize",
    color:"#808080"
  },
});

export default PersonalInfo;
