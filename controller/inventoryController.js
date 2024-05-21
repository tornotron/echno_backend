import asyncHandler from "express-async-handler"
import { inventoryCreate } from "../db/database.js"
//@desc Get all the inventory
//@route GET /api/inventory
//@access public
const getInventory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all inventory" })
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
    await inventoryCreate(location, itemJSON)
    res.status(201).json({
        message: `Item added to ${location} inventory: ${item}`
    })
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

export { getInventory, createInventory, getaInventory, updateInventory, deleteInventory }