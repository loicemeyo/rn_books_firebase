import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyARlocLENC3lROQFL9OVtFCRpbFTKJM9II",
  authDomain: "native-1bf43.firebaseapp.com",
  databaseURL: "https://native-1bf43.firebaseio.com",
  projectId: "native-1bf43",
  storageBucket: "native-1bf43.appspot.com",
  messagingSenderId: "622205159467"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;