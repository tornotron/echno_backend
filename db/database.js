import admin from "firebase-admin"
import serviceAccount from "../.firebaseKey/serviceAccountKey.json" assert { type: 'json' }


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

async function inventoryCreate(item, location, itemJSON) {
    try {
        const inventoryDb = db.collection('inventory')
        await inventoryDb.doc(location).set({ location: location })
        await inventoryDb.doc(location).collection('machines').doc(item).set(itemJSON)
    } catch (error) {
        console.error("Error creating items in inventory", error)
    }
}

async function inventoryFetch() {
    try {
        const inventoryRef = db.collection('inventory')
        const snapshot = await inventoryRef.get()
        if (snapshot.empty) {
            console.log("No document exists")
            return
        }
        const subcollectionDataMap = {}
        for (const doc of snapshot.docs) {
            const subcollectionData = {}
            const subcollectionRef = doc.ref.collection('machines')
            const subsnapshot = await subcollectionRef.get()


            if (subsnapshot.empty) {
                console.log(`No documents found in subcollection 'machines' for document ${doc.id}`);
                return
            } else {
                subsnapshot.forEach(subDoc => {
                    subcollectionData[subDoc.id] = subDoc.data()
                })
            }
            subcollectionDataMap[doc.id] = subcollectionData
        }
        return subcollectionDataMap
    } catch (error) {
        console.error("Error fetching inventory items", error)
    }
}

async function inventoryRequest(newRequest) {
    try {
        const inventoryRequestdb = db.collection('inventoryRequests')
        await inventoryRequestdb.doc(newRequest.requestId).set(newRequest)
    } catch (error) {
        console.log("Error creating inventory request", error)
    }
}

async function inventoryRequestForward(requestId) {
    try {
        const inventoryRequestForwarddb = db.collection('inventoryRequests')
        await inventoryRequestForwarddb.doc(requestId).update({ status: "forwarded" })

    } catch (error) {
        console.log("Error forwarding inventory request", error)
    }
}

async function checkRequestFetch() {
    try {
        const checkRequestdb = db.collection('inventoryRequests')
        const snapshot = await checkRequestdb.get()
        snapshot.forEach(doc => {
            console.log(doc.data())
        })
       

    } catch (error) {
        console.log("Error fetching inventory requests", error)
    }
}



export { fetchUserIds, inventoryCreate, inventoryFetch, inventoryRequest, inventoryRequestForward , checkRequestFetch}