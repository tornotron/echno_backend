import admin from "firebase-admin"
import serviceAccount from "../.firebaseKey/serviceAccountKey.json" assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

async function fetchUserIds() {
    try {
        const userIds = []
        const data = await admin.auth().listUsers()
        const numberofUsers = data.users.length
        for (let i = 0; i < numberofUsers; i++) {
            userIds.push(data.users[i].uid)
        }
        return userIds
    } catch (error) {
        console.error("Error fetching uid", error)
    }
}

async function inventoryCreate(location,itemJSON) {
    try {
        const inventoryDb = db.collection('inventory')
        const res = await inventoryDb.doc(location).set(itemJSON)
        return res
    } catch (error) {
        console.error("Error creating items in inventory", error)
    }
}


export {fetchUserIds, inventoryCreate}