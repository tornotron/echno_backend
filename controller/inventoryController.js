import asyncHandler from "express-async-handler"
import { inventoryCreate, inventoryFetch, inventoryRequest, inventoryRequestForward, inventoryRequestStatus, storeResponse} from "../db/database.js"
import { v4 as uuidv4 } from 'uuid'

//@desc Get all the inventory
//@route GET /api/inventory
//@access public
/**
 * Handles the GET request for fetching all inventory items.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getInventory = asyncHandler(async (req, res) => {
    const inventoryData = await inventoryFetch()
    res.status(200).json(inventoryData)
})

//@desc Create new inventory
//@route POST /api/inventory
//@access public
/**
 * Handles the POST request for creating a new inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const createInventory = asyncHandler(async (req, res) => {
    console.log("The request body:", req.body)
    const { item, location, statusOfItem } = req.body
    if (!item || !location) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const itemJSON = {
        item: item,
        location: location,
        statusOfItem: statusOfItem
    }
    await inventoryCreate(item, location, itemJSON)
    res.status(201).json({
        message: `Item added to ${location} inventory: ${item}`
    })
})

//@dec Create inventory request
//@route POST /api/inventory/request
//@access public
/**
 * Handles the POST request for creating a new inventory request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const createInventoryRequest = asyncHandler(async (req, res) => {
    console.log("The request body:", req.body)
    const requestId = uuidv4()
    const { requestedItems, location } = req.body
    if (!requestedItems) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const newRequest = { requestId, requestedItems, status: 'requested' }
    await inventoryRequest(newRequest)
    res.status(200).json(newRequest)
})

//@desc Forward inventory request
//@route PUT /api/inventory/:requestId/forward
//@access public
/**
 * Handles the PUT request for forwarding an inventory request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const forwardInventoryRequest = asyncHandler(async (req, res) => {
    console.log("The request body:", req.body)
    const { location } = req.body
    if (!location) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    await inventoryRequestForward(req.params.requestId, location)
    res.status(200).json({ message: `forwarded requestId: ${req.params.requestId} with location: ${location}` })
})

//@desc Get all inventory requests status
//@route GET /api/inventory/requestStatus
//@access public 
/**
 * Handles the GET request for fetching all inventory requests status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getInventoryRequestStatus = asyncHandler(async (req, res) => {
    const inventoryRequestStatusData = await inventoryRequestStatus()
    res.status(200).json(inventoryRequestStatusData)
})

//@desc Response from the store for specific inventory request
//@route POST /requestStatus/:requestId/storeInventoryResponse
//@access public
/**
 * Handles the POST request for storing an inventory response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const storeInventoryResponse = asyncHandler(async (req, res) => {
    console.log("The request body:", req.body)
    const {availableItems} = req.body
    if(!availableItems) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    await storeResponse(req.params.requestId, availableItems)
    res.status(200).json({ message: `store inventory response for reqID: ${req.params.requestId} with availableItems: ${JSON.stringify(availableItems)}` })
})

//@desc Get an inventory
//@route GET /api/inventory/:id
//@access public
/**
 * Handles the GET request for fetching a specific inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getaInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get inventory for ${req.params.id}` })
})

//@desc update an inventory
//@route PUT /api/inventory/:id
//@access public
/**
 * Handles the PUT request for updating a specific inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const updateInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `updated ${req.params.id}` })
})

//@desc delete an inventory
//@route PUT /api/inventory/:id
//@access public
/**
 * Handles the PUT request for deleting a specific inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const deleteInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete inventory for ${req.params.id}` })
})

export { getInventory, createInventory, getaInventory, updateInventory, deleteInventory, createInventoryRequest, forwardInventoryRequest, getInventoryRequestStatus, storeInventoryResponse}