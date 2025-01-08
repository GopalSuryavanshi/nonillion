import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DashboardGrid = () => {

  const navigation = useNavigation()
  return (
    <>
    <View style={{width:"100%"}}>

      
      <View style={styles.gridRow}>
        
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={styles.iconCircle}>
          <Image source={require("../../assets/Dashboard/BusinessProfile.png")} style={{height:60,width:60}}></Image>
      
              {/* Icon or image can be placed inside here */}
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Business Profile</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={()=>navigation.navigate('Packges')}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={styles.iconCircle}>
          <Image source={require("../../assets/Dashboard/plans.png")} style={{height:60,width:60,left:3,top:3}}></Image>
      
              {/* Icon or image can be placed inside here */}
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Plans</Text>
        </View>

      </View>











      <View style={styles.gridRow}>
        
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
          <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={styles.iconCircle}>
          <Image source={require("../../assets/Dashboard/Accounts.png")} style={{height:60,width:60}}></Image>
      
              {/* Icon or image can be placed inside here */}
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Accounts</Text>
        </View>

        <View style={[styles.gridContainer,]}>
          <View style={{}}>
          <TouchableOpacity onPress={()=>navigation.navigate('LeadsList')}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={{ borderRadius: 10,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,}}>
          <Image source={require("../../assets/Dashboard/leads.png")} style={{height:60,width:60,left:3,top:3}}></Image>
      
              {/* Icon or image can be placed inside here */}
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Leads</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.gridItem]}>
          <TouchableOpacity onPress={()=>navigation.navigate('HelpScreen')}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={styles.iconCircle}>
              {/* Icon or image can be placed inside here */}
              <Image source={require("../../assets/Dashboard/contact.png")} style={{height:60,width:60,left:3,top:3}}></Image>
      
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Contact Us</Text>
        </View>

        

      </View>














      <View style={styles.gridRow}>
        
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
          <TouchableOpacity onPress={()=>navigation.navigate('Managespecification')}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={styles.iconCircle}>

        <Image source={require("../../assets/Dashboard/managespecation.png")} style={{height:60,width:60,left:3,top:3}}></Image>
              {/* Icon or image can be placed inside here */}
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Specification</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            
          <TouchableOpacity onPress={()=>navigation.navigate('Faq', { name: "" })}>
          <LinearGradient
        colors={['#FF0404', '#820101']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
       style={styles.iconCircle}>
        <Image source={require("../../assets/Dashboard/faq.png")} style={{height:60,width:60,left:3,top:3}}></Image>
              {/* Icon or image can be placed inside here */}
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>FAQ</Text>
        </View>

      </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridRow: {
    padding: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  gridContainer: {
    alignItems: 'center',
    width: '45%', // Better layout management for grid items
  },
  gridItem: {
    borderRadius: 10,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Creates a card-like shadow effect
  },
  iconCircle: {
    borderWidth: 0,
    borderColor: '#000', // Icon circle border color
    height: 60,
    width: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    // fontWeight: '600', // Slightly bolder text
    textAlign: 'center',
    fontFamily:"Poppins-Regular"
  },
});

export default DashboardGrid;
