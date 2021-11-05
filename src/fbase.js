import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/storage";

const REACT_APP_API_KEY = "AIzaSyA_zPakmYzUPsqxmbRfjVzEW6QS-TWC2N0";
const REACT_APP_AUTH_DOMAIN = "jjabwitter.firebaseapp.com";
const REACT_APP_PROJECT_ID =  "jjabwitter";
const REACT_APP_STORAGE_BUCKET = "jjabwitter.appspot.com";
const REACT_APP_MESSAGIN_ID = "648557114275";
const REACT_APP_APP_ID = "1:648557114275:web:4651dcc9faa50566582016";
const REACT_APP_MEASUR_ID = "G-10NC4HXLRL";

const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId:REACT_APP_MESSAGIN_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUR_ID,

  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseInstance = firebase;
  export const authService = firebase.auth();
  export const dbService = firebase.firestore();
  export const storageService = firebase.storage();