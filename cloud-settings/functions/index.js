const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.writeDeviceLecutres = functions.pubsub.topic('oximeter-events').onPublish( async (message) => {

  const json_message = message.data ? Buffer.from(message.data, 'base64').toString() : null;
  try{
    const messageBody = JSON.parse(json_message);
    const messageAttr = message.attributes ? message.attributes : null;
    let deviceNumID= null, data= null;
    if(messageBody.bpm && messageBody.spo2 && messageAttr.deviceNumId){
        data = {
            bpm: messageBody.bpm,
            spo2: messageBody.spo2,
            timestamp: admin.firestore.Timestamp.fromDate(new Date())
        }
        deviceNumID = messageAttr.deviceNumId;
        let deviceRef = db.collection('devices').doc(deviceNumID);
        await deviceRef.get()
            .then((doc) => {
                if(doc.data().userID){
                    db.collection('users')
                        .doc(doc.data().userID)
                        .update({history: admin.firestore.FieldValue.arrayUnion(data)});
                        return true;
                }else{
                    console.log("Usuario no asignado");
                    return false;
                }
            })
            .then(()=>{
                deviceRef.update(data);
                console.log("Success");
                return true;
            })
            .catch((err) => {
                        console.log('Error getting device', err);
                        return false;
            });
    }else{
        console.log('Datos insuficientes!', messageBody, messageAttr);
    }
  }catch(e){
      console.log('Error', e);
  }
  return null;
});

exports.updateUser = functions.firestore.document('devices/{deviceId}').onUpdate((change, context) => {
      const newValue = change.after.data();
      const previousValue = change.before.data();

      const userId = previousValue.userID;
      
      if(userId !== "" && newValue.userID !== userId){
            db.collection('users')
                .doc(userId)
                .update({serie_number: ""});
                return true;
        }else{
            console.log("Usuario no asignado o mismo usuario");
            return false;
        }
    });