import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FreeListingModalPopup from './FreeListingModalPopup';

const FreeListingCard = (props) => {
  const { data, navigation, plan } = props;

  const handlePress = () => {
    if (plan === data.name) {
      navigation.navigate("HelpScreen");
    } else {
      navigation.navigate("FeaturesSummary", { data: data });
    }
  };

  return (
    <View style={{ borderWidth: 0, justifyContent: "center", alignSelf: "center" }}>
      <View style={styles.card}>

        <Image
          style={{ padding: 0, borderColor: "#000", height: 100, width: 100, top: -58, borderRadius: 500 }}
          source={{ uri: data.img }}
        />

        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.subtitle}>Free Listing for users</Text>
        <View style={{flexDirection:"row"}}>
        <Text style={{backgroundColor:"green",color:'#000',paddingHorizontal:10,borderRadius:5,fontWeight:900}}>Save {data?.discount||"0"}%</Text>

        <View style={{ padding: 0, borderColor: '#ccc', paddingHorizontal: 10, borderWidth: 0, borderRadius: 0 ,flexDirection:"row"}}>
          <Text style={{color:"#000"}}>₹</Text>
        <Text style={{
          borderWidth:0,
  color: '#000',
  paddingHorizontal: 0,
  
  fontWeight: '900',
  textDecorationLine: 'line-through' // Add this line for strikethrough
}}>{(data?.autal_price || "0")}
</Text>

</View>
        </View>

        <Text style={styles.price}>₹ {Math.ceil(data.total_price)} 
       

        </Text>

        <TouchableOpacity onPress={handlePress}>
          {(data.price === "0" || data.price === "0.0" || (data.price !== "0.00")) && 
            <Text style={styles.enrollButton}>
              {plan === data.name ? "Renew" : "Enroll Now"}
            </Text>
          }
        </TouchableOpacity>

        <View style={styles.benefits}>
          {data.features.map((pkg, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <Text style={styles.benefitItem}>• {pkg.name}</Text>
              <FreeListingModalPopup description={pkg.description} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 300,
    margin: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B71C1C',
    marginBottom: 8,
    borderWidth: 0,
    fontFamily:"Poppins-Regular"
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  enrollButton: {
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: "#961702",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontWeight: "900",
  },
  benefits: {
    marginTop: 16,
  },
  benefitItem: {
    fontSize: 16,
    color: '#757575',
    fontFamily:"Poppins-Regular",
    marginBottom: 8,
  },
});

export default FreeListingCard;
