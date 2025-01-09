import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Home from './Src/Home';
import CreateAccount from './Src/CreateAccount';
import UserProfile from './Src/UserProfile';
import Uploadimg from './Src/Uploadimg';
import Dashboard from './Src/Dashboard';
import ServicesandPrice from './Src/ServicesandPrice';
import Notification from './Src/Notification';
import AddServices from './Src/AddServices';
import Profile from './Src/Proflie';
import AddServicePrice from './Src/AddServicePrice';
import Faq from './Src/Faq';
import Inquiry from './Src/Inquiry';
import OrdersStatus from './Src/OrdersStatus';
import Order from './Src/Order';
import Test from './Src/Test2';
import Orderlist from './Src/Orderlist';
import Gallery from './Src/Gallery';
import Tools from './Src/System/Tools';
import Appointments from './Src/Appointments';
import UpdateService from './Src/service/UpdateService';
import { MyProvider } from './Src/MyContext';

import ReviewRating from './Src/ReviewRating';
import Managespecification from './Src/screen/Managespecification';
import Packages from './Src/screens/Packages';
import FeaturesSummary from './Src/FeaturesSummary';
import CancelScreen from './Src/CancelScreen';
import SelasPenal from './Src/SelasPenal';
import SelasPenal_Dashboard from './Src/System/SelasPenal/SelasPenal';
import SelasPenal_all_enquiry from './Src/System/SelasPenal/SelasPenal_all_enquiry';
import SelasPenal_facebook from './Src/System/SelasPenal/SelasPenal_facebook';
import SelasPenal_notification from './Src/System/SelasPenal/SelasPenal_notification';
import PaymentScreen from './Src/PaymentScreen/PaymentScreen';
import LeadsList from './Src/LeadsList';

import { OTPVerification } from './Src/OTPVerification';
import { PasswordUpdated } from './Src/PasswordUpdated';
import Forgetpassword from './Src/Forgetpassword';
import NewCredentials from './Src/NewCredentials';
import { ResponceSN } from './Src/ResponceSN';
import UpdateBusinessinfo from './Src/Business/UpdateBusinessinfo';
import BusinessLogoUpload from './Src/Business/BusinessLogoUpload';

// import messaging from '@react-native-firebase/messaging'; 

import OrderHistory from './Src/screen/OrderHistory';
import InvoiceScreen from './Src/screen/InvoiceScreen';
import FailScreen from './Src/FailScreen';
import SuccessScreen from './Src/SuccessScreen';
import HelpScreen from './Src/HelpScreen';

import DeviceInfo from 'react-native-device-info';
// import firestore from '@react-native-firebase/firestore';
import PlaystorePopup from './Src/systm/PlaystorePopup';
import BusinessFAQ from './Src/FAQ/BusinessFAQ';
import DashboardScreen from './Src/screens/DashboardScreen';
import MediaLibraryScreen from './Src/screens/MediaLibraryScreen';
// import OTPVerificationScreen from './Src/OTPVerificationScreen';

const Stack = createNativeStackNavigator();

function App() {




  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getFCMToken() {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    settext(token)
    return token;
  }

  const [text, settext] = React.useState("")
  React.useEffect(() => {
    requestUserPermission();
    getFCMToken();
  }, []);

  React.useEffect(() => {
    // This code will be executed after the component is mounted
    SplashScreen.hide();
  }, []);




  const [Playstore, setPlaystore] = React.useState({ Version: "", message: "", size: "" })


  React.useEffect(() => {
    getVersion();
  }, [])


  const [isUpdate, setisUplate] = React.useState(false)


  const getVersion = async () => {
    try {
      const users = await firestore().collection('aroundme').get();
      setisUplate(users.docs[0]._data.versionid !== DeviceInfo.getVersion() ? true : false)


      const data = {
        Version: users.docs[0]._data.versionid,
        message: users.docs[0]._data.message,
        size: users.docs[0]._data.size
      };

      // Set the state with the fetched data
      setPlaystore(data);

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <NavigationContainer>
      <MyProvider>
        <PlaystorePopup data={Playstore} action={isUpdate} setisUplate={setisUplate}></PlaystorePopup>
        {/* <TextInput value={text}></TextInput> */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* f:\Aroundme\src\ReviewList.js f:\Aroundme\src\StarRationg.jsx f:\Aroundme\src\RatingReview.js */}



          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
          <Stack.Screen name="NewCredentials" component={NewCredentials} />

          <Stack.Screen name="ResponceSN" component={ResponceSN} />



          <Stack.Screen name="OTPVerification" component={OTPVerification} />
          <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />



          <Stack.Screen name="ReviewRating" component={ReviewRating} />

          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="ServicesandPrice" component={ServicesandPrice} />
          <Stack.Screen name="Notification" component={Notification} />

          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="EditProfile" component={Profile} />
          <Stack.Screen name="AddServices" component={AddServices} />

          <Stack.Screen name="AddPrice" component={AddServicePrice} />

          <Stack.Screen name="Faq" component={BusinessFAQ} />
          <Stack.Screen name="Inquiry" component={Inquiry} />

          <Stack.Screen name="Managespecification" component={Managespecification} />

          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="MediaLibraryScreen" component={MediaLibraryScreen} />






          <Stack.Screen name="LeadsList" component={LeadsList} />
          <Stack.Screen name="UploadImg" component={Uploadimg} />
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="Tools" component={Tools} />
          <Stack.Screen name="Appointments" component={Appointments} />

          <Stack.Screen name="BusinesslogoUpload" component={BusinessLogoUpload} />


          <Stack.Screen name="UpdateService" component={UpdateService} />






          <Stack.Screen name="OrdersStatus" component={OrdersStatus} />

          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Orders" component={Orderlist} />


          <Stack.Screen name="Packges" component={Packages} />


          <Stack.Screen name="FeaturesSummary" component={FeaturesSummary} />
          <Stack.Screen name="CancelScreen" component={CancelScreen} />

          <Stack.Screen name="FailScreen" component={FailScreen} />

          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="HelpScreen" component={HelpScreen} />


          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />




          <Stack.Screen name="selasPenal" component={SelasPenal} />





          <Stack.Screen name="SelasPenal_Dashboard" component={SelasPenal_Dashboard} />
          <Stack.Screen name="SelasPenal_all_enquiry" component={SelasPenal_all_enquiry} />
          <Stack.Screen name="SelasPenal_facebook" component={SelasPenal_facebook} />
          <Stack.Screen name="SelasPenal_notification" component={SelasPenal_notification} />

          <Stack.Screen name="UpdateBusinessinfo" component={UpdateBusinessinfo} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />




        </Stack.Navigator>
      </MyProvider>


    </NavigationContainer>
  );
}

export default App;