import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMyContext } from '../MyContext';
import FullScreenDataLoader from '../System/FullScreenDataLoader';
import HtmlView from '../systm/HtmlView';

const BusinessInfo = () => {
    const navigation = useNavigation();
    const { LoginState } = useMyContext();
    const [BusinessData, setBusinessData] = useState(null);
    const [mapurl, setMapUrl] = useState("");

    useEffect(() => {
        GetBusinessData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            GetBusinessData(); // Fetch data when screen is focused
        }, [])
    );

    const GetBusinessData = () => {
        axios.get(
            `https://api.aroundme.co.in/businessapp/?id=${LoginState.Busid}`,
            {
                headers: {
                    Authorization: `Bearer ${LoginState.Token}`,
                },
            }
        )
        .then((response) => {
            const data = response.data.data;
            setBusinessData(data);
            setMapUrl(data.map_url || "");
        })
        .catch((error) => {
            console.error("Error fetching business data:", error);
        });
    };

    if (!BusinessData) {
        return <FullScreenDataLoader color="#961702" />;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.title}>Business Info:</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateBusinessinfo')}
                    style={{
                        flexDirection: 'row',
                        backgroundColor: "#961702",
                        justifyContent: "center",
                        width: 70,
                        padding: 5,
                        margin: 5,
                        borderRadius: 50
                    }}>
                    <Text style={{ color: "#fff", fontSize: 10, textAlign: "center", fontWeight: 900 }}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Name</Text>
                        <Text style={styles.value}>{BusinessData.business_name}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Status</Text>
                        <Text style={styles.value}>{BusinessData.business_status === "A" ? "Active" : "In-Active"}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Pincode</Text>
                        <Text style={styles.value}>{BusinessData.pincode}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Latitude</Text>
                        <Text style={styles.value}>{BusinessData.latitude}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Longitude</Text>
                        <Text style={styles.value}>{BusinessData.longitude}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business State</Text>
                        <Text style={styles.value}>{BusinessData.state}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business City</Text>
                        <Text style={styles.value}>{BusinessData.city_name}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Address</Text>
                        <Text style={styles.value}>{BusinessData.address}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Country</Text>
                        <Text style={styles.value}>{BusinessData.country}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Map Address</Text>
                        <Text style={styles.value}>{mapurl}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>GST (Optional)</Text>
                        <Text style={styles.value}>{BusinessData.gst_optional}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>PAN No.</Text>
                        <Text style={styles.value}>{BusinessData.pan_no}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Highlighted Area</Text>
                        <Text style={styles.value}>{BusinessData.highlighted_area}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Verification Date</Text>
                        <Text style={styles.value}>{"--"}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Open - Time</Text>
                        <Text style={styles.value}>{BusinessData.open_time}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Close - Time</Text>
                        <Text style={styles.value}>{BusinessData.close_time}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Business Description</Text>
                    <HtmlView data={BusinessData.description}></HtmlView>
                        {/* <Text style={styles.value}>{BusinessData.description}</Text> */}
                    </View>
                </View>
                <View>
                    <View style={styles.infoItem}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.label}>Business Logo</Text>
                            <Text
                                onPress={() => navigation.navigate("BusinesslogoUpload", { data: { title: "Business Logo", slug: "business_logo",file:BusinessData.business_logo } })}
                                style={[styles.label, { color: "#961702" }]}
                            >
                                Edit
                            </Text>
                        </View>
                        <Image source={{ uri: BusinessData.business_logo }} style={styles.image} />
                    </View>
                    <View style={styles.infoItem}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.label}>Business Document Front</Text>
                            <Text
                                onPress={() => navigation.navigate("BusinesslogoUpload", { data: { title: "Business Document front", slug: "business_documents_front_optional",file:BusinessData.business_documents_front_optional } })}
                                style={[styles.label, { color: "#961702" }]}
                            >
                                Edit
                            </Text>
                        </View>
                        <Image source={{ uri: BusinessData.business_documents_front_optional }} style={styles.image} />
                    </View>
                    <View style={styles.infoItem}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.label}>Business Document Back</Text>
                            <Text
                                onPress={() => navigation.navigate("BusinesslogoUpload", { data: { title: "Business Document back", slug: "business_documents_back_optional",file:BusinessData.business_documents_back_optional } })}
                                style={[styles.label, { color: "#961702" }]}
                            >
                                Edit
                            </Text>
                        </View>
                        <Image source={{ uri: BusinessData.business_documents_back_optional }} style={styles.image} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        marginRight: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color:"#808080"
    },
    value: {
        fontSize: 14,
        textTransform: "capitalize"
        ,color:"#808080"
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default BusinessInfo;
