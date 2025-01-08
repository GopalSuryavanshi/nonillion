import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Button, TextInput } from 'react-native';
import axios from 'axios';
import { Header } from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMyContext } from './MyContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const { LoginState } = useMyContext();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('https://api.aroundme.co.in/businessapp/facebookleadview/list', {
          headers: {
            'Authorization': `Bearer ${LoginState.Token}`
          }
        });
        setLeads(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchLeads();
  }, [LoginState.Token]);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filterByDateRange = (date) => {
    const leadDate = new Date(date);
    const from = fromDate ? new Date(fromDate.setHours(0, 0, 0, 0)) : null;
    const to = toDate ? new Date(toDate.setHours(23, 59, 59, 999)) : null;

    return (!from || leadDate >= from) && (!to || leadDate <= to);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.full_name.replace(/\b\w/g, char => char.toUpperCase())}</Text>
      <View style={styles.cardRow}>
        <Icon name="phone" size={20} color="#961702" />
        <TouchableOpacity onPress={() => handleCall(item.phone)}>
          <Text style={styles.cardText}>{item.phone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardRow}>
        <Icon name="envelope" size={20} color="#961702" />
        <TouchableOpacity onPress={() => handleEmail(item.email)}>
          <Text style={styles.cardText}>{item.email}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.cardRow}>
        <Icon name="calendar" size={20} color="#961702" />
        <Text style={styles.cardText}>{item.remarks_date}</Text>
      </View> */}
    </View>
  );

  const filteredLeads = leads.filter((lead) => {
    return (
      (lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery)) &&
      filterByDateRange(lead.date_time)
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header Title={"My Leads"} />
      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, email, phone, or date"
          placeholderTextColor={"#808080"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Date Pickers */}
        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            {/* <TouchableOpacity style={{borderColor:"#961702",borderRadius:5, borderWidth:1,padding:5,flexDirection:"row"}} onPress={() => setShowFromDatePicker(true)}>
              <Text>{fromDate ? formatDate(fromDate) +" " : "From Date"} </Text>
              <Icon name="calendar" size={20} color="#961702" />
            </TouchableOpacity> */}
            {/* <Button onPress={() => setShowFromDatePicker(true)}  /> */}
            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFromDatePicker(false);
                  if (selectedDate) {
                    setFromDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
          <View style={styles.dateInputContainer}>

            <View style={{ borderWidth: 0, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <TouchableOpacity style={{ borderColor: "#961702", borderRadius: 5, width: "40%", borderWidth: 1, padding: 5, flexDirection: "row", }} onPress={() => setShowFromDatePicker(true)}>
                <Icon name="calendar" size={30} color="#961702" />
                <View>
                  <Text style={{ color: "#000", fontSize: 10 }}>{" From"} </Text>
                  <Text style={{ color: "#000", fontSize: 12 }}>{fromDate ? " " + formatDate(fromDate) + " " : " DD/MM/YYYY"} </Text>
                </View>
              </TouchableOpacity>
              <Text style={{ fontWeight: '900', fontSize: 25, borderWidth: 0, color: "#961702", width: 20, marginHorizontal: 5 }}>-</Text>
              <TouchableOpacity style={{ borderColor: "#961702", width: "40%", borderRadius: 5, borderWidth: 1, padding: 5, flexDirection: "row" }} onPress={() => setShowToDatePicker(true)}>
                <Icon name="calendar" size={30} color="#961702" />
                <View>
                  <Text style={{ color: "#000", fontSize: 10 }}>{" TO"} </Text>
                  <Text style={{ color: "#000", fontSize: 12 }}>{toDate ? " " + formatDate(toDate) + " " : " DD/MM/YYYY"} </Text>

                </View>
              </TouchableOpacity>
            </View>


            {/* <Button onPress={() => setShowToDatePicker(true)} title={toDate ? formatDate(toDate) : "To Date"} /> */}
            {showToDatePicker && (
              <DateTimePicker
                value={toDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowToDatePicker(false);
                  if (selectedDate) {
                    setToDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
        </View>

        {/* Leads List */}
        {loading ? (
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        ) : (
          <FlatList
            data={filteredLeads}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#808080"
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#808080",
    marginRight: 5,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 8, // for iOS shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#808080"
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default LeadsTable;
