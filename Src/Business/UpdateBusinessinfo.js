import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../Header';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useMyContext } from '../MyContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import FullScreenDataLoader from '../System/FullScreenDataLoader';
import AlertMessage from '../AlertMessage';

const UpdateBusinessinfo = () => {
  const { LoginState, updateState } = useMyContext();
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [businesslistdata, setBusinesslistdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    businesstype();
    GetBusinessdata();
  }, []);



  const businesstype = () => {
    axios
      .get("https://api.aroundme.co.in/businessapp/category/", {
        headers: {
          Authorization: `Bearer ${LoginState.Token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setBusinesslistdata(response.data.data);
        } else {
          console.error("Invalid response structure", response.data);
          setBusinesslistdata([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setBusinesslistdata([]);
      });
  };

  const [businessdata, setBusinessData] = useState([]);
  const [businame, setBusiName] = useState("");
  const [busitype, setBusiType] = useState("");
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [state, setState] = useState("");
  const [businesscity, setBusinesscity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [mapurl, setmapurl] = useState("");
  const [gst, setGst] = useState("");
  const [pan, setPan] = useState("");
  const [business_area, setBusiness_area] = useState("");
  const [business_country, setBusiness_country] = useState("");
  const [busiOpentime, setBusiOpentime] = useState(new Date(0, 0, 0, 17, 15)); // Set to 5:15 PM
  const [busiClosetime, setBusiClosetime] = useState(new Date(0, 0, 0, 17, 15)); // Set to 5:15 PM
  const [busidesc, setBusidesc] = useState("");
  const [weekday, setWeekday] = useState("sunday");

  const [businesslogo, setbusinesslogo] = useState("");
  const [businessfrontdoc, setbusinessfrontdoc] = useState("");
  const [businessbackdoc, setbusinessbackdoc] = useState("");
  const [pinchange, setPinChanged] = useState(false);
  const [geoapifydata, setgeoapifydata] = useState([]);
  const [showOpenTimePicker, setShowOpenTimePicker] = useState(false);
  const [showCloseTimePicker, setShowCloseTimePicker] = useState(false);

  const geoapify = (pincodeX) => {
    if (pincodeX.length == 6) {
      axios
        .get("https://api.postalpincode.in/pincode/" + pincodeX)
        .then((response) => {
          setPinChanged(true);
          setgeoapifydata(response.data[0].PostOffice);
          setState(response.data[0].PostOffice[0].State);
          setBusinesscity(response.data[0].PostOffice[0].District);
          setBusiness_country(response.data[0].PostOffice[0].Country);
        })
        .catch((error) => {
          setPinChanged(true);
          console.error(error);
        });

      const geoapifykey = "abc57b70a5904b0187136c494e4ccf60";
      axios.get(
        "https://api.geoapify.com/v1/geocode/autocomplete?text=" +
        pincodeX +
        "&apiKey=" +
        geoapifykey
      )
        .then((response) => {
          setLongitude(response.data && response.data.features[0].properties.lon.toString());
          setLattitude(response.data && response.data.features[0].properties.lat.toString());
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const GetBusinessdata = async () => {

    setloading(true)
    axios
      .get(
        "https://api.aroundme.co.in/businessapp/?id=" + LoginState.Busid,
        {
          headers: {
            Authorization: `Bearer ${LoginState.Token}`,
          },
        }
      )
      .then((response) => {
        setBusinessData(response.data.data);
        setBusiName(response.data.data.business_name || "");
        setSelectedBusinessType(response.data.data.category_id ? parseInt(response.data.data.category_id) : "");
        setLattitude(response.data.data.latitude);
        setLongitude(response.data.data.longitude);
        setState(response.data.data.state || "");
        setBusinesscity(response.data.data.city_api || "");
        setPincode(response.data.data.pincode || "");
        setAddress(response.data.data.address || "");
        setmapurl(response.data.data.map_url || "");
        setGst(response.data.data.gst_optional || "");
        setPan(response.data.data.pan_no || "");
        setBusiness_area(response.data.data.highlighted_area || "");
        setBusiness_country(response.data.data.country || "");
        const parseTime = (time, defaultHours, defaultMinutes) => {
          const match = time && time.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
          return match ? new Date(1970, 0, 1, (parseInt(match[1], 10) % 12) + (match[3].toUpperCase() === 'PM' ? 12 : 0), parseInt(match[2], 10)) : new Date(1970, 0, 1, defaultHours, defaultMinutes);
        };

        setBusiOpentime(parseTime(response.data.data.open_time, 9, 0)); // Default to 9:00 AM
        setBusiClosetime(parseTime(response.data.data.close_time, 22, 0)); // Default to 10:00 PM


        setBusidesc(response.data.data.description || "");
        setbusinesslogo(response.data.data.business_logo || "");
        setbusinessfrontdoc(response.data.data.business_documents_front_optional || "");
        setbusinessbackdoc(response.data.data.business_documents_back_optional || "");
        geoapify(response.data.data.pincode || "")
        setloading(false)
      })
      .catch((error) => {
        setloading(false);
        console.error(error);
      });
  };

  const [timer, setTimer] = useState(null);

  const handlepinchange = (e) => {
    const value = e;
    setPincode(value);
    if (value.length == 6) {
      geoapify(value);
    }
  };

  const handleSubmitBusinessDetails = async () => {
    try {
      console.log("entered try block", LoginState);


      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LoginState.Token}`,
      };

      const businessformdata = {
        business_name: businame,
        category_id: selectedBusinessType,
        latitude: lattitude,
        longitude: longitude,
        state: state,
        city_api: businesscity,
        pincode: pincode,
        address: address,
        map_url: mapurl,
        gst_optional: gst,
        pan_no: pan,
        highlighted_area: business_area,
        country: business_country,
        weekday_off: weekday,
        open_time: new Date(busiOpentime.toISOString()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        close_time: new Date(busiClosetime.toISOString()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        description: busidesc
      };

      console.log("businessd", businessformdata);

      const response = await axios.put(
        "https://api.aroundme.co.in/businessapp/busineessedit/",
        businessformdata,
        { headers }
      );
      console.log("response", response);
      // console.log("data", businessformdata);

      // console.log("response2:", response.data);
      setModalVisible(true)

      GetBusinessdata();



    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error("Error response data:", error.response);
      } else {
        console.error("Error updating data:", error.message);
      }
    }
  };

  const onChangeOpenTime = (event, selectedDate) => {
    setShowOpenTimePicker(false);
    setBusiOpentime(selectedDate || busiOpentime);
  };

  const onChangeCloseTime = (event, selectedDate) => {
    setShowCloseTimePicker(false);
    setBusiClosetime(selectedDate || busiClosetime);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Header Title={"Update Business Info"} />
      {loading && <FullScreenDataLoader color={"#961702"}></FullScreenDataLoader>}

      <AlertMessage screenName={"UserProfile"} Title={"Business information updated successfully"} setModalVisible={setModalVisible} modalVisible={modalVisible}></AlertMessage>
      <View style={styles.inputContainer}>
        <ScrollView>
          <Text style={styles.label}>Business Name</Text>
          <TextInput value={businame} onChangeText={text => setBusiName(text)} style={styles.input} placeholder="Enter Business Details" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Business Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBusinessType}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedBusinessType(itemValue)}
            >
              <Picker.Item label="Select Business Type" value="" />
              {businesslistdata && businesslistdata.map((item, key) => (
                <Picker.Item label={item.category_name} key={key} value={item.id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Business PinCode</Text>
          <TextInput value={pincode} style={styles.input} onChangeText={text => handlepinchange(text)} placeholder="Enter PinCode" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Business MapUrl</Text>
          <TextInput value={mapurl} onChangeText={text => setmapurl(text)} style={styles.input} placeholder="Enter Map URL" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Business Address</Text>
          <TextInput value={address} onChangeText={text => setAddress(text)} style={styles.input} placeholder="Enter Address" placeholderTextColor="#aaa" />

          <Text style={styles.label}>GST (Optional)</Text>
          <TextInput value={gst} onChangeText={text => setGst(text)} style={styles.input} placeholder="Enter GST NO." placeholderTextColor="#aaa" />

          <Text style={styles.label}>Business PAN NO.</Text>
          <TextInput value={pan} onChangeText={text => setPan(text)} style={styles.input} placeholder="Enter Business PAN NO" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Highlighted Area</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={business_area}
              style={styles.picker}
              onValueChange={(itemValue) => setBusiness_area(itemValue)}
            >
              {geoapifydata && geoapifydata.map((item, key) => (
                <Picker.Item label={item.Name} key={key} value={item.Name} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Business Country</Text>
          <TextInput style={styles.input} placeholder="Enter Business Country" value={business_country} placeholderTextColor="#aaa" />

          <Text style={styles.label}>Business Open-Time</Text>
          <TouchableOpacity onPress={() => setShowOpenTimePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Enter Business Open-Time"
              placeholderTextColor="#aaa"
              value={formatTime(busiOpentime)}
              editable={false}
            />
          </TouchableOpacity>
          {showOpenTimePicker && (
            <DateTimePicker
              value={busiOpentime}
              mode="time"
              display="default"
              onChange={onChangeOpenTime}
            />
          )}

          <Text style={styles.label}>Business Close-Time</Text>
          <TouchableOpacity onPress={() => setShowCloseTimePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Enter Business Close-Time"
              placeholderTextColor="#aaa"
              value={formatTime(busiClosetime)}
              editable={false}
            />
          </TouchableOpacity>
          {showCloseTimePicker && (
            <DateTimePicker
              value={busiClosetime}
              mode="time"
              display="default"
              onChange={onChangeCloseTime}
            />
          )}

          <TouchableOpacity onPress={handleSubmitBusinessDetails} style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#800000",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#800000",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    marginBottom: 20,
    color: "#000",
  },
  pickerContainer: {
    borderColor: "#800000",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 40

  },
  picker: {
    padding: 0,
  },
  updateButton: {
    marginBottom: 50,
    backgroundColor: "#961702",
    padding: 10,
    borderRadius: 100,
  },
  updateButtonText: {
    textAlign: "center",
    color: "#fff",
  },
});

export default UpdateBusinessinfo;

