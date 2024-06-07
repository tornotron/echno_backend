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

/**
 * Asynchronously creates a new item in the inventory with the given item, location, and JSON data.
 *
 * @param {string} item - The name of the item to be created.
 * @param {string} location - The location where the item will be stored.
 * @param {Object} itemJSON - The JSON data for the item.
 * @return {Promise<void>} A Promise that resolves when the item has been successfully created.
 */
async function inventoryCreate(item, location, itemJSON) {
    try {
        const inventoryDb = db.collection('inventory')
        await inventoryDb.doc(location).set({ location: location })
        await inventoryDb.doc(location).collection('machines').doc(item).set(itemJSON)
    } catch (error) {
        console.error("Error creating items in inventory", error)
    }
}

/**
 * Asynchronously fetches all the inventory items and their associated subcollections.
 *
 * @return {Promise<Object>} A Promise that resolves to an object mapping each location document ID
 * to an object mapping each machine document ID to its associated data. If no documents exist,
 * an empty object is returned.
 * @throws {Error} If there is an error fetching the data.
 */
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

/**
 * Asynchronously creates a new inventory request with the given JSON data.
 *
 * @param {Object} newRequest - The JSON data for the new request.
 * @return {Promise<void>} A Promise that resolves when the request has been successfully created.
 * @throws {Error} If there is an error creating the request.
 */
async function inventoryRequest(newRequest) {
    try {
        const inventoryRequestdb = db.collection('inventoryRequests')
        await inventoryRequestdb.doc(newRequest.requestId).set(newRequest)
    } catch (error) {
        console.log("Error creating inventory request", error)
    }
}

/**
 * Asynchronously forwards an inventory request to the specified location.
 *
 * @param {string} requestId - The ID of the request to forward.
 * @param {string} location - The location to which the request is being forwarded.
 * @return {Promise<void>} A Promise that resolves when the request has been successfully forwarded.
 * @throws {Error} If there is an error forwarding the request.
 */
async function inventoryRequestForward(requestId, location) {
    try {
        const inventoryRequestForwarddb = db.collection('inventoryRequests')
        await inventoryRequestForwarddb.doc(requestId).set({ status: "forwarded", location: location },{merge:true})

    } catch (error) {
        console.log("Error forwarding inventory request", error)
    }
}

/**
 * Asynchronously fetches the status of all inventory requests.
 *
 * @return {Promise<Object>} A Promise that resolves to an object mapping each request document ID
 * to its associated data. If no documents exist, an empty object is returned.
 * @throws {Error} If there is an error fetching the data.
 */
async function inventoryRequestStatus() {
    try{
        const inventoryRequestdb = db.collection('inventoryRequests')
        const snapshot = await inventoryRequestdb.get()
        const statusMap = {}
        snapshot.forEach(doc => {
            statusMap[doc.id] = doc.data()
        })
        return statusMap
    } catch(error) {
        console.log("Error fetching inventory request status", error)
    }
}

/**
 * Asynchronously stores the inventory response for a given request ID and available items.
 *
 * @param {string} requestId - The ID of the inventory request.
 * @param {Array} availableItems - The list of available items.
 * @return {Promise<void>} A Promise that resolves when the inventory response has been successfully stored.
 * @throws {Error} If there is an error storing the inventory response.
 */
async function storeResponse(requestId, availableItems) {
    try {
        const storeResponsedb = db.collection('inventoryRequests')
        await storeResponsedb.doc(requestId).set({ status: "completed", availableItems: availableItems},{merge:true})
    } catch(error) {
        console.log("Error storing inventory response", error)
    }
}

/**
 * Asynchronously deletes an inventory item with the given location and item names.
 *
 * @param {string} location - The location of the inventory item to delete.
 * @param {string} item - The name of the inventory item to delete.
 * @return {Promise<*>} A Promise that resolves to the result of the deletion operation. If the item does not exist,
 * the Promise resolves to the string "No such document".
 * @throws {Error} If there is an error deleting the item.
 */
async function inventoryItemDelete(location, item) {
    try {
        const inventoryDeleteRef = db.collection('inventory')
        const snapshot = await inventoryDeleteRef.doc(location).collection('machines').doc(item).get()
        if (!snapshot.exists) {
            console.log("No such document")
            return 'No such document'
        }
        const result = await inventoryDeleteRef.doc(location).collection('machines').doc(item).delete()
        return result
    } catch(error) {
        console.log("Error deleting inventory item", error)
    }
}




export { fetchUserIds, inventoryCreate, inventoryFetch, inventoryRequest, inventoryRequestForward, inventoryRequestStatus , storeResponse, inventoryItemDelete}