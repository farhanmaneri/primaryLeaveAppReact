import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
	// Your Credentials
    apiKey: "AIzaSyAWpvpzJK1-uxcvgbyI1DasDpWHj29JX14",
  authDomain: "primleaveappreact.firebaseapp.com",
  projectId: "primleaveappreact",
  storageBucket: "primleaveappreact.appspot.com",
  messagingSenderId: "44687586726",
  appId: "1:44687586726:web:ba11609788f365ed690b67",
  measurementId: "G-724XS05S3X"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;
