import asyncHandler from "express-async-handler"
import { inventoryCreate, inventoryFetch, inventoryRequest , inventoryRequestForward, checkRequestFetch} from "../db/database.js"
import { v4 as uuidv4 } from 'uuid'

//@desc Get all the inventory
//@route GET /api/inventory
//@access public
const getInventory = asyncHandler(async (req, res) => {
    const inventoryData = await inventoryFetch()
    res.status(200).json(inventoryData)
})

//@desc Create new inventory
//@route POST /api/inventory
//@access public
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

const createInventoryRequest = asyncHandler(async (req, res) => {
    console.log("The request body:", req.body)
    const requestId = uuidv4()
    const { items, location } = req.body
    if (!items, !location) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const newRequest = { requestId, items, location, status: 'requested' }
    await inventoryRequest(newRequest)
    res.status(200).json(newRequest)
})

//@desc Forward inventory request
//@route PUT /api/inventory/:requestId/forward
//@access public

const forwardInventoryRequest = asyncHandler(async (req, res) => {
    await inventoryRequestForward(req.params.requestId)
    res.status(200).json({ message: `forwarded with requestId: ${req.params.requestId}` })
})

//@desc Fetch all inventory request status
//@route GET /api/inventory/checkrequest
//@access public

const checkRequest = asyncHandler(async (req, res)=> {
    const checkRequestData = await checkRequestFetch()
    res.status(200).json({message: "its working"})
})

//@desc Get an inventory
//@route GET /api/inventory/:id
//@access public
const getaInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get inventory for ${req.params.id}` })
})

//@desc update an inventory
//@route PUT /api/inventory/:id
//@access public
const updateInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `updated ${req.params.id}` })
})

//@desc delete an inventory
//@route PUT /api/inventory/:id
//@access public
const deleteInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete inventory for ${req.params.id}` })
})

export { getInventory, createInventory, getaInventory, updateInventory, deleteInventory, createInventoryRequest, forwardInventoryRequest , checkRequest}