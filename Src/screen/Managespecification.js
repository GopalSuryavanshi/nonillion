import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Header } from '../Header';
import ServiceTypeCard from '../component/ServiceTypeCard';
import axios from 'axios';
import { useMyContext } from '../MyContext';
import Addservicespecfication from '../component/Addservicespecfication';

const Managespecification = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { LoginState, updateState } = useMyContext();

    useEffect(() => {
        fetchdata(LoginState.Mid, LoginState.Token);
    }, []);

    const fetchdata = async (ID, token) => {
        setLoading(true);
        console.log(token);
        try {
            const response = await axios.get('https://api.aroundme.co.in/businessapp/merchentbusiness-feature/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const fetchedData = response.data.data;
            console.log(fetchedData);
            setData(fetchedData);
            console.log("okk");
        } catch (error) {
            Alert.alert('Error getting data: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.aroundme.co.in/businessapp/business_feature/delete/${id}/`, { data: { "business_details_id": LoginState.Mid } });
            fetchdata(LoginState.Mid, LoginState.Token);
        } catch (error) {
            console.error('Error deleting data', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header Title={"Manage specification"} />

            <ScrollView style={{ backgroundColor: "white" }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#961702" />
                ) : (
                    data.length === 0 ? (
                        <Text style={{ textAlign: 'center', margin: 20 }}>Click the plus button to add specifications or amenities for your business</Text>
                    ) : (
                        data.map((feature, key) => (
                            <ServiceTypeCard
                                key={feature.key_filed} // Make sure to add a unique key for each element in the map
                                serviceType={feature.key_value}
                                Servicetype={feature.key_filed}
                                onEdit={() => console.log('Edit button pressed')}
                                onDelete={() => handleDelete(feature.id)}
                                data={feature}
                                fetchdata={fetchdata}
                            />
                        ))
                    )
                )}
            </ScrollView>

            <Addservicespecfication fetchdata={fetchdata} />
        </View>
    );
};

export default Managespecification;
