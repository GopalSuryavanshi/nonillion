import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet,TouchableOpacity } from 'react-native';

function ConfirmAlert({props,Message,Title}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
        

<TouchableOpacity style={{backgroundColor:'red',padding:10, alignSelf:'center',marginTop:10}} onPress={()=>setModalVisible(true)}>
    <Text style={{color:'white',fontWeight:900,}}>Confirm Alert
    </Text>


    </TouchableOpacity>

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
                        <Text style={{alignSelf:'center',fontSize:20,color:'#000000',fontWeight:'700',marginBottom:20}}>{Title}
                        </Text>
                        
                            <Text style={{marginBottom:20,color:'#000000',fontSize:18,alignSelf:'center'}}>
                              {Message}
                            </Text>
                       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                           
                        <TouchableOpacity  onPress={ ()=>setModalVisible(false)}> 
                        <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#961702', color: 'white', padding: 5, paddingHorizontal: 45 }}>LOG OUT</Text>

                            </TouchableOpacity>
                           <TouchableOpacity  onPress={() => setModalVisible(false)}>
                            <Text style={{ borderRadius: 20, fontWeight: 800, fontSize: 15, backgroundColor: '#CCCCCC', color: '#961702', padding: 5, paddingHorizontal: 45 }}>
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
        padding: 15,
        borderRadius: 10,
    },
});

export default ConfirmAlert;

