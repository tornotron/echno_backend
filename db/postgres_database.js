import pool from './database.js'
import { v4 as uuidv4 } from 'uuid'

async function PinventoryCreate(item, location, itemJSON) {
  try {
    const item_id = uuidv4()
    await pool.query(`INSERT INTO inventory (item_id, item_name, location, statusOfItem) VALUES ($1, $2, $3, $4)`, [item_id, item, location, itemJSON.statusOfItem]);
  } catch (error) {
    console.error("Error creating items in inventory", error)
  }
}

async function PinventoryFetch() {
  try {
    const result = await pool.query(`SELECT * FROM inventory`);
    return result.rows
  } catch (error) {
    console.error("Error fetching inventory items", error)
  }
}

async function PspecificInventoryFetch(filteredParams) {
  try {
    if (filteredParams.item_name && filteredParams.item_id && filteredParams.location) {
      const result = await pool.query(`SELECT * FROM inventory WHERE item_name = $1 AND item_id = $2 AND location = $3`, [filteredParams.item_name, filteredParams.item_id, filteredParams.location])
      return result.rows
    }
    if (filteredParams.location) {
      const result = await pool.query(`SELECT * FROM inventory WHERE location = $1`, [filteredParams.location])
      return result.rows
    }
    if (filteredParams.item_name) {
      const result = await pool.query(`SELECT * FROM inventory WHERE item_name = $1`, [filteredParams.item_name])
      return result.rows
    }
    if (filteredParams.item_id) {
      const result = await pool.query(`SELECT * FROM inventory WHERE item_id = $1`, [filteredParams.item_id])
      return result.rows
    }
    if (filteredParams.statusOfItem) {
      const result = await pool.query(`SELECT * FROM inventory WHERE statusOfItem = $1`, [filteredParams.statusOfItem])
      return result.rows
    }
    // if (filteredParams.item_name && filteredParams.location) {
    //   const result = await pool.query(`SELECT * FROM inventory WHERE item_name = $1 AND location = $2`, [filteredParams.item_name, filteredParams.location])
    //   return result.rows
    // }
    // if (filteredParams.item_name && filteredParams.item_id) {
    //   const result = await pool.query(`SELECT * FROM inventory WHERE item_name = $1 AND item_id = $2`, [filteredParams.item_name, filteredParams.item_id])
    //   return result.rows
    // }
    // if (filteredParams.item_name && filteredParams.statusOfItem) {
    //   const result = await pool.query(`SELECT * FROM inventory WHERE item_name = $1 AND statusOfItem = $2`, [filteredParams.item_name, filteredParams.statusOfItem])
    //   return result.rows
    // }
    // if (filteredParams.item_id && filteredParams.location) {
    //   const result = await pool.query(`SELECT * FROM inventory WHERE item_id = $1 AND location = $2`, [filteredParams.item_id, filteredParams.location])
    //   return result.rows
    // }
    // if (filteredParams.item_id && filteredParams.statusOfItem) {
    //   const result = await pool.query(`SELECT * FROM inventory WHERE item_id = $1 AND statusOfItem = $2`, [filteredParams.item_id, filteredParams.statusOfItem])
    //   return result.rows
    // }
    // if (filteredParams.location && filteredParams.statusOfItem) {
    //   const result = await pool.query(`SELECT * FROM inventory WHERE location = $1 AND statusOfItem = $2`, [filteredParams.location, filteredParams.statusOfItem])
    //   return result.rows
    // }
  } catch (error) {
    console.error("Error fetching inventory items", error)
  }
}

async function PinventoryRequestCreate(newrequest) {
  try {
    await pool.query(`INSERT INTO inventoryRequests (request_id, requested_items, status) VALUES ($1, $2, $3)`, [newrequest.requestId, newrequest.requestedItems, newrequest.status])
  } catch (error) {
    console.error("Error creating inventory request", error)
  }
}

async function PinventoryRequestForward(requestId, location) {
  try {
    await pool.query(`UPDATE inventoryRequests SET status = $1, location = $2 WHERE request_id = $3`, ['forwarded', location, requestId])
  } catch (error) {
    console.error("Error forwarding inventory request to central store", error)
  }
}

async function PinventoryRequestfetch() {
  try {
    const result = await pool.query(`SELECT * FROM inventoryRequests`)
    return result.rows
  } catch (error) {
    console.error("Error fetching inventory requests", error)
  }
}

async function PspecificInventoryRequestfetch(filteredParams) {
  try {
    if (filteredParams.requestId) {
      const result = await pool.query(`SELECT * FROM inventoryRequests WHERE request_id = $1`, [filteredParams.requestId])
      return result.rows
    }
  } catch (error) {
    console.error("Error fetching inventory request", error)
  }
}

async function PstoreResponse(requestID, availableItems) {
  try {
    const result = await pool.query(`UPDATE inventoryRequests SET status = $1, available_items = $2 WHERE request_id = $3`, ['completed', availableItems, requestID])
    result.rows
  } catch (error) {
    console.error("Error posting store response", error)
  }
}

export { PinventoryCreate, PinventoryFetch, PspecificInventoryFetch, PinventoryRequestCreate, PinventoryRequestForward, PinventoryRequestfetch, PspecificInventoryRequestfetch, PstoreResponse }
