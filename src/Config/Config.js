import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBPOpUt2rCA2tc-H59KzJHmfb7MqcvnAYY",
  authDomain: "e-commerce-website-b3d12.firebaseapp.com",
  projectId: "e-commerce-website-b3d12",
  storageBucket: "e-commerce-website-b3d12.appspot.com",
  messagingSenderId: "938962846625",
  appId: "1:938962846625:web:641f62e27c1ae08421c1e0",
  measurementId: "G-BX7QHF0JYM"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}