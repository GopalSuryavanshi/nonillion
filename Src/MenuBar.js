import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Use FontAwesome from react-native-vector-icons
import Logouticon from './Logouticon';

const MenuBar = () => {
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
     

     <TouchableOpacity style={styles.menuItem}>
      {/* <Image source={require("./assets/Menu/Logout.png")}></Image> */}
        <Text style={styles.menuText}></Text>
      </TouchableOpacity>


      <TouchableOpacity  onPress={()=>navigation.navigate("Packges")} style={styles.menuItem}>
        <Image source={require("./assets/Menu/Download.png")}></Image>
        <Text style={styles.menuText}>Upgrade Plan</Text>
      </TouchableOpacity>





      <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{borderWidth:0,height:80,width:80,zIndex:10,backgroundColor:"red",borderRadius:100,justifyContent:"center",alignSelf:"center",alignItems:"center"}}
      >
      
        

        <View style={{borderWidth:5,borderColor:"#fff",height:30,width:30,zIndex:10,backgroundColor:"red",borderRadius:100}}>
        <View style={{borderWidth:2,borderColor:"#961702",height:20,width:20,zIndex:10,backgroundColor:"#fff",borderRadius:100}}></View>


        </View>
    
    </LinearGradient>
    
      
      <TouchableOpacity   onPress={()=>navigation.navigate("HelpScreen")}  style={styles.menuItem}>
      <Image source={require("./assets/Menu/Chat.png")}></Image>
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>


<Logouticon></Logouticon>
      
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    borderRadius: 50,
   // Adjust margin as per your design
    marginBottom: 20,
    height:50,
    width:"90%",
    bottom:25,
    marginHorizontal:20,
    elevation:5
    
    
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#000',
    fontSize: 8,
    marginTop: 5,
    fontFamily:"Poppins-Regular"
  },
  centerLogo: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  logoContainer: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 100,
  },
  logo: {
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default MenuBar;
