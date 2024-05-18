//@desc Get all the inventory
//@route GET /api/inventory
//@access public
const getInventory = (req, res) => {
    res.status(200).json({ message: "Get all inventory" })
}

//@desc Create new inventory
//@route POST /api/inventory
//@access public
const createInventory = (req, res) => {
    console.log("The request body:", req.body)
    res.status(201).json({ message: "Get all inventory" })
}

//@desc Get an inventory
//@route GET /api/inventory/:id
//@access public
const getaInventory = (req, res) => {
    res.status(200).json({ message: `Get inventory for ${req.params.id}` })
}

//@desc update an inventory
//@route PUT /api/inventory/:id
//@access public
const updateInventory = (req, res) => {
    res.status(200).json({ message: `updated ${req.params.id}` })
}

//@desc delete an inventory
//@route PUT /api/inventory/:id
//@access public
const deleteInventory = (req, res) => {
    res.status(200).json({ message: `Delete inventory for ${req.params.id}` })
}

module.exports = { getInventory, createInventory ,getaInventory, updateInventory, deleteInventory}