import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useMyContext } from '../../MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogOut({props,Message,Title,closeDrawer,loadDataLogin}) {
    const [modalVisible, setModalVisible] = useState(false);
    


   


    const saveData = async data => {
        try {
          await AsyncStorage.setItem('MyAppLogin',"");
        } catch (error) {
          console.error('Error saving data to AsyncStorage:', error);
        }
      };




      
    return (
        <>
        


<TouchableOpacity style={{}} onPress={()=>{setModalVisible(true);}}>
    <Text style={{color:'white' ,fontFamily:'Poppins-Regular',}}>Logout
    </Text>


    </TouchableOpacity>

        <View style={{padding:12,color:'white' ,position:'relative',marginVertical:10,}}>
           
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{alignSelf:'center',fontSize:20,color:'#000000',fontWeight:'700',marginBottom:20,fontFamily:'Poppins-Regular'}}>{Title}
                        </Text>
                        
                            <Text style={{marginBottom:20,color:'#000000',fontSize:18,alignSelf:'center',fontFamily:'Poppins-Regular'}}>
                              {Message +"?"}
                            </Text>
                       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>
                           
                        <TouchableOpacity  onPress={ ()=>{ setModalVisible(false);saveData([]),closeDrawer(false),loadDataLogin()}}> 
                        <Text style={{ borderRadius: 20,fontFamily:'Poppins-Regular', fontWeight: 800, fontSize: 15, backgroundColor: '#961702', color: 'white',textTransform:'capitalize' , padding: 5, paddingHorizontal: 25 }}>LOG OUT</Text>

                            </TouchableOpacity>
                           <TouchableOpacity  onPress={() => setModalVisible(false)}>
                            <Text style={{ borderRadius: 20,fontFamily:'Poppins-Regular',textTransform:'capitalize' , fontWeight: 800, fontSize: 15, backgroundColor: '#CCCCCC', color: '#961702', padding: 5, paddingHorizontal: 25 }}>
                             CANCEL</Text>

                                </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: 340, // Customize the width as needed
        backgroundColor: 'white',
        paddingVertical: 40,
        borderRadius: 10,
    },
});

export default LogOut;

