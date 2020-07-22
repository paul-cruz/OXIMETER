import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyB5oQOX_jfnnkXrUnhppKQcKM14pkkAc9A",
    authDomain: "dev-oximeter.firebaseapp.com",
    databaseURL: "https://dev-oximeter.firebaseio.com",
    projectId: "dev-oximeter",
    storageBucket: "dev-oximeter.appspot.com",
    messagingSenderId: "742491490618",
    appId: "1:742491490618:web:16279b19ce3fb9426c2803"
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const microsoftAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');

export {app, googleAuthProvider, facebookAuthProvider, microsoftAuthProvider};  