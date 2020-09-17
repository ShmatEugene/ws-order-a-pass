import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDfrKvNVXLlJ_opm8LU266FIYxkmhlsT5I',
  authDomain: 'ws-order-a-pass.firebaseapp.com',
  databaseURL: 'https://ws-order-a-pass.firebaseio.com',
  projectId: 'ws-order-a-pass',
  storageBucket: 'ws-order-a-pass.appspot.com',
  messagingSenderId: '185632248342',
  appId: '1:185632248342:web:92a4130480a05994495b37',
  measurementId: 'G-6JDL9FHTP6',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
