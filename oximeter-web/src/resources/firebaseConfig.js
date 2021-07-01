import * as firebase from "firebase/app";
import "firebase/auth";
const app = firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "[APP_NAME].firebaseapp.com",
  databaseURL: "https://[APP_NAME].firebaseio.com",
  projectId: "[PROJECT_ID]",
  storageBucket: "[APP_NAME].appspot.com",
  messagingSenderId: "",
  appId: "",
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const microsoftAuthProvider = new firebase.auth.OAuthProvider("microsoft.com");
export { app, googleAuthProvider, facebookAuthProvider, microsoftAuthProvider };
