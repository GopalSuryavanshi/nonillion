import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDWWFIxxNqdqS_v2ZnwTPl6HAKDRxLz8u8",
  authDomain: "aroundme-b20b0.firebaseapp.com",
  projectId: "aroundme-b20b0",
  storageBucket: "aroundme-b20b0.appspot.com",
  messagingSenderId: "414757960271",
  appId: "1:414757960271:android:14143cd269ea5d5e17083a",
  measurementId: "", // You can add the measurement ID if you have it.
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
