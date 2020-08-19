import { app } from '../resources/firebaseConfig';
import 'firebase/firestore';

const db = app.firestore();

const updateUserData = (uid, data) => {
    var userRef = db.collection('users').doc(uid);
    return userRef.update(data);
}

const updateDeviceData = (id, data) => {
    var deviceRef = db.collection('devices').doc(id);
    return deviceRef.update(data);
}

const getData = (uid) => {
    return db.collection('users')
        .doc(uid)
        .get();
}

const getUserRef = (uid) =>{
    return db.collection('users')
    .doc(uid);
}

const isRegistered = async (uid) => {
    return await db.collection('users').doc(uid).get().then(function (doc) {
        if (doc.exists) {
            return true;
        } else {
            return false;
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
};

const regiterUser = async ({ uid, name, email }) => {
    return await db.collection("users").doc(uid).set({
        name: name,
        email: email,
    });
}

export { regiterUser, isRegistered, getData, updateUserData, updateDeviceData, getUserRef };