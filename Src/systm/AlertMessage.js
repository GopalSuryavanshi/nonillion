import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';

function AlertMessage({ props, Title ,modalVisible,setModalVisible}) {
  
   return (
        <>
            <View style={styles.container}>

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
                            {/* <Text style={{alignSelf:'center',fontSize:20,color:'#000000',fontWeight:'700',marginBottom:20}}>Come back soon !
                        </Text> */}

                            <View>      
                                    <Text style={{ fontFamily:'Poppins-Regular', marginBottom: 20, color: '#000000', fontSize: 18, fontWeight:'600',alignSelf: 'center', justifyContent: 'center',textAlign:'center' }}>
                                     {Title}                 
                                   </Text>

                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>

                                {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#961702', color: 'white', padding: 5, paddingHorizontal: 45 }}>Ok</Text>

                                </TouchableOpacity> */}



                                
<TouchableOpacity onPress={() => setModalVisible(false)} style={{backgroundColor:'#961702',paddingHorizontal:20 ,padding:7,borderRadius:10,height:42}}>

<Text style={{fontWeight:"700", fontSize:18,color:'white',alignSelf:'center',padding:0,fontFamily:'Poppins-Regular'}}>OK</Text>
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
        // flex: 1,
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
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});



export default AlertMessage